/**
 *
 */
package com.lotterychecker.components;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.lotterychecker.service.CheckerService;
import com.lotterychecker.util.CheckerConstants;
import com.lotterychecker.util.CheckerUtil;

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

@Component
public class CheckerScheduled {
    
    private static final Logger	LOG = LoggerFactory.getLogger(CheckerScheduled.class);
    
    @Autowired
    private CheckerService	checkService;

    @Value(CheckerConstants.GAMES_TO_CHECK_PROP)
    private String		games;
    
    @Scheduled(initialDelayString = CheckerConstants.INITIAL_DELAY_PROP, fixedDelayString = CheckerConstants.DELAY_PROP)
    private void scheduledCheck() {
	LOG.debug("Entry method scheduledCheck()");
	
	List<String> gameList = Arrays.asList(games.split(","));
	if (gameList != null && gameList.size() > 0) {
	    
	    for (String game : gameList) {
		
		Instant start = Instant.now();
		LOG.info("Start check: " + game + " - " + CheckerUtil.dateTimeFormatter(start));
		
		checkService.checkResult(game);
		
		Instant end = Instant.now();
		LOG.info("End check - " + CheckerUtil.dateTimeFormatter(end));
		LOG.info("Duration: " + Duration.between(start, end).toMillis() + " millis.");
	    }
	    LOG.debug("Exit method scheduledCheck()");
	}
    }
}
