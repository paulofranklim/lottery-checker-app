/**
 *
 */
package com.lotterychecker.model;

import java.math.BigDecimal;

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
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long       id;
    private boolean    active;
    private BigDecimal accumulatedPrize;
    private String     numbers;
    private Long       userId;
    private Long       gameId;

    public Bet() {
    }

    /**
     * @param active
     * @param accumulatedPrize
     * @param numbers
     * @param userId
     * @param gameId
     */
    public Bet(boolean active, BigDecimal accumulatedPrize, String numbers, Long userId, Long gameId) {
	super();
	this.active = active;
	this.accumulatedPrize = accumulatedPrize;
	this.numbers = numbers;
	this.userId = userId;
	this.gameId = gameId;
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
     * @return the active
     */
    public boolean isActive() {
	return active;
    }

    /**
     * @param active
     *            the active to set
     */
    public void setActive(boolean active) {
	this.active = active;
    }

    /**
     * @return the accumulatedPrize
     */
    public BigDecimal getAccumulatedPrize() {
	return accumulatedPrize;
    }

    /**
     * @param accumulatedPrize
     *            the accumulatedPrize to set
     */
    public void setAccumulatedPrize(BigDecimal accumulatedPrize) {
	this.accumulatedPrize = accumulatedPrize;
    }

    /**
     * @return the numbers
     */
    public String getNumbers() {
	return numbers;
    }

    /**
     * @param numbers
     *            the numbers to set
     */
    public void setNumbers(String numbers) {
	this.numbers = numbers;
    }

    /**
     * @return the userId
     */
    public Long getUserId() {
	return userId;
    }

    /**
     * @param userId
     *            the userId to set
     */
    public void setUserId(Long userId) {
	this.userId = userId;
    }

    /**
     * @return the gameId
     */
    public Long getGameId() {
	return gameId;
    }

    /**
     * @param gameId
     *            the gameId to set
     */
    public void setGameId(Long gameId) {
	this.gameId = gameId;
    }

    @Override
    public String toString() {
	return "Bet [id=" + id + ", active=" + active + ", accumulatedPrize=" + accumulatedPrize + ", numbers=" + numbers + ", userId=" + userId + ", gameId="
	        + gameId + "]";
    }

}
