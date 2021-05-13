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
public class CheckedResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long       id;
    private String     gameName;
    private Long       drawNumber;
    private String     drawDate;
    private String     drawNumbers;
    private String     hittedNumbers;
    private int	       hits;
    private BigDecimal prize;
    private Long       userId;

    public CheckedResult() {
    }
    
    /**
     * @param gameName
     * @param drawNumber
     * @param drawDate
     * @param drawNumbers
     * @param hittedNumbers
     * @param hits
     * @param prize
     * @param userId
     */
    public CheckedResult(String gameName, Long drawNumber, String drawDate, String drawNumbers, String hittedNumbers, int hits, BigDecimal prize, Long userId) {
	super();
	this.gameName = gameName;
	this.drawNumber = drawNumber;
	this.drawDate = drawDate;
	this.drawNumbers = drawNumbers;
	this.hittedNumbers = hittedNumbers;
	this.hits = hits;
	this.prize = prize;
	this.userId = userId;
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
     * @return the gameName
     */
    public String getGameName() {
	return gameName;
    }

    /**
     * @param gameName
     *            the gameName to set
     */
    public void setGameName(String gameName) {
	this.gameName = gameName;
    }

    /**
     * @return the drawNumber
     */
    public Long getDrawNumber() {
	return drawNumber;
    }

    /**
     * @param drawNumber
     *            the drawNumber to set
     */
    public void setDrawNumber(Long drawNumber) {
	this.drawNumber = drawNumber;
    }

    /**
     * @return the drawDate
     */
    public String getDrawDate() {
	return drawDate;
    }

    /**
     * @param drawDate
     *            the drawDate to set
     */
    public void setDrawDate(String drawDate) {
	this.drawDate = drawDate;
    }

    /**
     * @return the drawNumbers
     */
    public String getDrawNumbers() {
	return drawNumbers;
    }

    /**
     * @param drawNumbers
     *            the drawNumbers to set
     */
    public void setDrawNumbers(String drawNumbers) {
	this.drawNumbers = drawNumbers;
    }

    /**
     * @return the hittedNumbers
     */
    public String getHittedNumbers() {
	return hittedNumbers;
    }

    /**
     * @param hittedNumbers
     *            the hittedNumbers to set
     */
    public void setHittedNumbers(String hittedNumbers) {
	this.hittedNumbers = hittedNumbers;
    }

    /**
     * @return the hits
     */
    public int getHits() {
	return hits;
    }

    /**
     * @param hits
     *            the hits to set
     */
    public void setHits(int hits) {
	this.hits = hits;
    }

    /**
     * @return the prize
     */
    public BigDecimal getPrize() {
	return prize;
    }

    /**
     * @param prize
     *            the prize to set
     */
    public void setPrize(BigDecimal prize) {
	this.prize = prize;
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

    @Override
    public String toString() {
	return "CheckedResult [id=" + id + ", gameName=" + gameName + ", drawNumber=" + drawNumber + ", drawDate=" + drawDate + ", drawNumbers=" + drawNumbers
	        + ", hittedNumbers=" + hittedNumbers + ", hits=" + hits + ", prize=" + prize + ", userId=" + userId + "]";
    }

}
