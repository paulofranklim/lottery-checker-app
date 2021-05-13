/**
 *
 */
package com.lotterychecker.vo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

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

@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiResultVO {

    @JsonProperty("numero_concurso")
    private Long	     drawNumber;
    @JsonProperty("data_concurso")
    private String	     date;
    @JsonProperty("dezenas")
    private List<String>     numbers;
    @JsonProperty("nome")
    private String	     name;
    @JsonProperty("premiacao")
    private List<ApiPrizeVO> prizes;

    public ApiResultVO() {
    }
    
    /**
     * @param drawNumber
     * @param date
     * @param numbers
     * @param name
     * @param prizes
     */
    public ApiResultVO(Long drawNumber, String date, List<String> numbers, String name, List<ApiPrizeVO> prizes) {
	super();
	this.drawNumber = drawNumber;
	this.date = date;
	this.numbers = numbers;
	this.name = name;
	this.prizes = prizes;
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
     * @return the date
     */
    public String getDate() {
	return date;
    }

    /**
     * @param date
     *            the date to set
     */
    public void setDate(String date) {
	this.date = date;
    }

    /**
     * @return the numbers
     */
    public List<String> getNumbers() {
	return numbers;
    }

    /**
     * @param numbers
     *            the numbers to set
     */
    public void setNumbers(List<String> numbers) {
	this.numbers = numbers;
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
     * @return the prizes
     */
    public List<ApiPrizeVO> getPrizes() {
	return prizes;
    }
    
    /**
     * @param prizes
     *            the prizes to set
     */
    public void setPrizes(List<ApiPrizeVO> prizes) {
	this.prizes = prizes;
    }

}
