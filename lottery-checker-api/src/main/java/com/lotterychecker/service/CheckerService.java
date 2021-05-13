/**
 *
 */
package com.lotterychecker.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lotterychecker.model.Bet;
import com.lotterychecker.model.CheckedResult;
import com.lotterychecker.model.Game;
import com.lotterychecker.model.User;
import com.lotterychecker.repository.BetRepository;
import com.lotterychecker.repository.CheckedResultRepository;
import com.lotterychecker.repository.GameRepository;
import com.lotterychecker.repository.UserRepository;
import com.lotterychecker.util.CheckerConstants;
import com.lotterychecker.util.CheckerUtil;
import com.lotterychecker.vo.ApiPrizeVO;
import com.lotterychecker.vo.ApiResultVO;
import com.lotterychecker.vo.MailCredentialsVO;

/**
 * <pre>
 * Author         : Paulo Franklim, paulofranklim@hotmail.com
 * Purpose        : <Purpose>
 * Input files    : N/A
 * Log File       : N/A
 * Output file    : N/A
 *
 * Copyright 2020 github.com/paulofranklim
 * </pre>
 */

@Service
public class CheckerService {
    private Logger		      LOG = LoggerFactory.getLogger(CheckerService.class);

    private ApiResultVO		      apiResultVO;
    
    private List<CheckedResult>	      checkedResults;
    
    private HashMap<Long, String>     currentUsersBet;

    private HashMap<Long, BigDecimal> currentPrizes;

    @Value(CheckerConstants.API_URL_PROP)
    private String		      API_URL;

    @Value(CheckerConstants.TOKEN_PROP)
    private String		      TOKEN_PREFIX;
    
    @Value(CheckerConstants.MAIL_ERROR_PROP)
    private String		      MAIL;

    @Autowired
    private CheckedResultRepository   resultRepository;
    
    @Autowired
    private BetRepository	      betRepository;
    
    @Autowired
    private UserRepository	      userRepository;
    
    @Autowired
    private GameRepository	      gameRepository;

    @Autowired
    private JavaMailSender	      mailSender;
    
    public boolean checkResult(String gameName) {
	LOG.debug("Entry method checkResult()");
	
	boolean result = true;
	
	String URL = API_URL + gameName + TOKEN_PREFIX;
	LOG.debug("URL=" + URL);
	
	try {
	    String apiJson = CheckerUtil.getApiJSON(URL);
	    apiResultVO = new ObjectMapper().readValue(apiJson, ApiResultVO.class);
	}
	catch (IOException e) {
	    String errorMsg = e.getMessage();
	    LOG.error("Error trying while create api object. " + errorMsg);
	    sendMail(CheckerUtil.createErrorMailCredentials(errorMsg, MAIL));
	    result = false;
	}
	
	Game game = gameRepository.findGameByName(gameName);
	
	if (game != null && game.getLastDraw().compareTo(apiResultVO.getDrawNumber()) == -1) {
	    
	    List<Bet> bets = betRepository.findAllBetsForGame(game.getId());
	    
	    if (bets != null && bets.size() > 0) {
		checkedResults = new ArrayList<CheckedResult>();
		currentUsersBet = new HashMap<Long, String>();
		currentPrizes = new HashMap<Long, BigDecimal>();

		for (ApiPrizeVO prize : apiResultVO.getPrizes()) {
		    currentPrizes.put(Long.valueOf(prize.getHits()), new BigDecimal(prize.getTotalValue()));
		}
		
		for (Bet bet : bets) {
		    User user = userRepository.findById(bet.getUserId()).orElse(null);
		    currentUsersBet.put(user.getId(), user.getMail());
		    
		    String hittedNumbers = CheckerUtil.getHittedNumbers(bet.getNumbers(), apiResultVO.getNumbers());
		    CheckedResult checkedResult = prepareResult(apiResultVO, hittedNumbers);
		    checkedResult.setUserId(user.getId());
		    game.setLastDraw(checkedResult.getDrawNumber());
		    
		    checkedResults.add(checkedResult);
		}
		
		MailCredentialsVO mailCredentials = new MailCredentialsVO();
		StringBuilder message = new StringBuilder();
		mailCredentials.setMessage(message);

		if (checkedResults.size() == 1) {
		    CheckedResult checkedResult = checkedResults.get(0);
		    Long currentUserId = checkedResult.getUserId();
		    String userMail = currentUsersBet.get(currentUserId);

		    message.append("Draw result: " + checkedResult.getHits() + CheckerConstants.LINE);
		    message.append("Hitted Numbers: " + checkedResult.getHittedNumbers() + CheckerConstants.LINE);
		    message.append("Prize : R$" + NumberFormat.getCurrencyInstance().format(checkedResult.getPrize()) + CheckerConstants.LINE);
		    
		    mailCredentials.setMessage(message);
		    mailCredentials.setSubject(gameName.toUpperCase() + " DRAW - " + checkedResult.getDrawNumber());
		    mailCredentials.setTo(userMail);
		    
		    sendMail(mailCredentials);
		} else {
		    
		    CheckedResult checkedResult = null;
		    boolean isOtherUser = false;
		    Long lastUserId = Long.valueOf(0);
		    Long currentUserId = Long.valueOf(0);
		    
		    for (int i = 0; i < checkedResults.size(); i++) {
			
			checkedResult = checkedResults.get(i);
			currentUserId = checkedResult.getUserId();
			
			if (i == 0) {
			    isOtherUser = false;
			} else {
			    isOtherUser = lastUserId.compareTo(currentUserId) != 0;
			}
			
			if (isOtherUser) {
			    sendMail(mailCredentials);
			    mailCredentials = new MailCredentialsVO();
			    message = new StringBuilder();
			    mailCredentials.setMessage(message);
			}
			
			mailCredentials.setSubject(gameName.toUpperCase() + " DRAW - " + checkedResult.getDrawNumber());
			mailCredentials.setTo(currentUsersBet.get(currentUserId));
			message.append("Draw result: " + checkedResult.getHits() + CheckerConstants.LINE);
			message.append("Hitted Numbers: " + checkedResult.getHittedNumbers() + CheckerConstants.LINE);
			message.append("Prize : R$" + NumberFormat.getCurrencyInstance().format(checkedResult.getPrize()) + CheckerConstants.LINE);
			message.append(CheckerConstants.LINE);
			
			if (i == checkedResults.size() - 1) {
			    sendMail(mailCredentials);
			}
			
			lastUserId = currentUserId;
		    }
		}
		
		try {
		    resultRepository.saveAll(checkedResults);
		    gameRepository.save(game);
		}
		catch (RuntimeException e) {
		    String errorMsg = e.getMessage();
		    LOG.error("Error trying to save checked results. " + errorMsg);
		    sendMail(CheckerUtil.createErrorMailCredentials(errorMsg, MAIL));
		    result = false;
		}
		LOG.debug("Exit method checkResult()");
	    }
	}
	return result;
    }

    private CheckedResult prepareResult(ApiResultVO apiResult, String hittedNumbers) {
	LOG.debug("Entry method prepareResult(LotofacilApiResultVO apiResult, String hittedNumbers)");
	CheckedResult result = new CheckedResult();
	
	result.setDrawNumber(apiResult.getDrawNumber());
	result.setDrawDate(apiResult.getDate());
	result.setDrawNumbers(apiResult.getNumbers().toString());
	result.setHittedNumbers(hittedNumbers);
	result.setGameName(apiResult.getName());
	
	int hits = hittedNumbers.split(",").length;
	result.setHits(hits);
	
	BigDecimal prize = currentPrizes.get(Long.valueOf(hits));
	result.setPrize(prize != null ? prize : BigDecimal.ZERO);
	
	LOG.debug("Exit method prepareResult(LotofacilApiResultVO apiResult, String hittedNumbers)");
	return result;
    }

    public boolean sendMail(MailCredentialsVO credentials) {
	LOG.debug("Entry method sendMail(MailCredentialsVO credentials)");
	LOG.debug("credentials" + credentials);
	boolean result = true;
	
	SimpleMailMessage message = new SimpleMailMessage();
	message.setSubject(credentials.getSubject());
	message.setTo(credentials.getTo());
	message.setText(credentials.getMessage().toString());
	
	try {
	    mailSender.send(message);
	    LOG.info("Send mail sucess");
	}
	catch (Exception e) {
	    result = false;
	    LOG.error("Error while tryng send mail. " + e.getMessage());
	}
	LOG.debug("result=" + result);
	LOG.debug("Exit method sendMail(MailCredentialsVO credentials)");
	return result;
    }
}
