/**
 *
 */
package com.lotterychecker.vo;

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
 * Copyright 2021 github.com/paulofranklim
 * </pre>
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiPrizeVO {
    @JsonProperty("valor_total")
    private String totalValue;

    @JsonProperty("acertos")
    private String hits;

    public ApiPrizeVO() {
    }

    /**
     * @param totalValue
     * @param hits
     */
    public ApiPrizeVO(String totalValue, String hits) {
	super();
	this.totalValue = totalValue;
	this.hits = hits;
    }

    /**
     * @return the totalValue
     */
    public String getTotalValue() {
	return totalValue;
    }

    /**
     * @param totalValue
     *            the totalValue to set
     */
    public void setTotalValue(String totalValue) {
	this.totalValue = totalValue;
    }

    /**
     * @return the hits
     */
    public String getHits() {
	return hits;
    }

    /**
     * @param hits
     *            the hits to set
     */
    public void setHits(String hits) {
	this.hits = hits;
    }

    @Override
    public String toString() {
	return "Prize [totalValue=" + totalValue + ", hits=" + hits + "]";
    }
}
