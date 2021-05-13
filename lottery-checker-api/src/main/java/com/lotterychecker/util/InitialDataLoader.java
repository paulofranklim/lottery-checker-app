/**
 *
 */
package com.lotterychecker.util;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.lotterychecker.model.Bet;
import com.lotterychecker.model.Game;
import com.lotterychecker.model.User;
import com.lotterychecker.repository.BetRepository;
import com.lotterychecker.repository.GameRepository;
import com.lotterychecker.repository.UserRepository;
import com.lotterychecker.service.CheckerService;

/**
 * <pre>
 * Author         : Paulo Franklim, paulofranklim@hotmail.com
 * Purpose        : <Purpose>
 * Input files    : N/A
 * Log File       : N/A
 * Output file    : N/A
 *
 * Copyright 2021 github.com/paulofranklim
 * </pre>
 */
@Component
public class InitialDataLoader implements ApplicationRunner {
    private Logger	   LOG = LoggerFactory.getLogger(CheckerService.class);
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private BetRepository  betRepository;

    @Value(CheckerConstants.DDL_AUTO_PROP)
    private String	   ddlAutoProp;
    
    @Override
    public void run(ApplicationArguments args) {
	if ("create".equalsIgnoreCase(ddlAutoProp)) {
	    LOG.info("Starting initial values");
	    
	    User user = userRepository.save(new User("Paulo Franklim", "paulofranklim@hotmail.com", "1234"));
	    
	    Game lotofacil = gameRepository.save(new Game("lotofacil", 15, 20, 25, (long) 0));
	    Game megasena = gameRepository.save(new Game("megasena", 6, 15, 60, (long) 0));
	    gameRepository.save(new Game("quina", 5, 15, 80, (long) 0));
	    
	    betRepository.save(new Bet(true, BigDecimal.ZERO, "01,03,05,06,08,09,10,13,14,16,18,20,21,22,24", user.getId(), lotofacil.getId()));
	    betRepository.save(new Bet(true, BigDecimal.ZERO, "18,27,40,36,38,20,14,37,03,55,44,46,01,02,09", user.getId(), megasena.getId()));
	    
	    LOG.info("Finishing initial values");
	}
    }
}
