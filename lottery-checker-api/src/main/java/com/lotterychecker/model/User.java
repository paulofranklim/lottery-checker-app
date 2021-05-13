/**
 *
 */
package com.lotterychecker.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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

@Entity
public class User {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long   id;
    private String name;
    private String mail;
    private String password;

    public User() {

    }

    /**
     * @param name
     * @param mail
     * @param password
     */
    public User(String name, String mail, String password) {
	super();
	this.name = name;
	this.mail = mail;
	this.password = password;
    }

    /**
     * @return the id
     */
    public Long getId() {
	return id;
    }

    /**
     * @param id
     *            the id to set
     */
    public void setId(Long id) {
	this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
	return name;
    }

    /**
     * @param name
     *            the name to set
     */
    public void setName(String name) {
	this.name = name;
    }

    /**
     * @return the mail
     */
    public String getMail() {
	return mail;
    }

    /**
     * @param mail
     *            the mail to set
     */
    public void setMail(String mail) {
	this.mail = mail;
    }

    /**
     * @return the password
     */
    public String getPassword() {
	return password;
    }

    /**
     * @param password
     *            the password to set
     */
    public void setPassword(String password) {
	this.password = password;
    }
    
    @Override
    public String toString() {
	return "User [id=" + id + ", name=" + name + ", mail=" + mail + ", password=" + password + "]";
    }

}
