/**
 *
 */
package com.lotterychecker.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lotterychecker.model.User;
import com.lotterychecker.service.AuthenticationService;

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

@RestController
public class AuthenticationController {

    private Logger		  LOG = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationService service;
    
    @RequestMapping(value = "auth", method = RequestMethod.POST)
    public User auth(@RequestBody User authUser) {
	LOG.debug("Entry method auth(@RequestBody User authUser)");
	
	String mail = authUser.getMail();
	String password = authUser.getPassword();
	
	User user = service.auth(mail, password);

	LOG.debug("Exit method auth(@RequestBody User authUser)");
	return user;
    }
}
