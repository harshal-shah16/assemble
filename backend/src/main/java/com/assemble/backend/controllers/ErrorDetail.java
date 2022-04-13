package com.assemble.backend.controllers;

public class ErrorDetail {

  private String errorMessage;

  public ErrorDetail (String message) {
    this.errorMessage = message;
  }

  public String getErrorMessage() {
    return errorMessage;
  }



}
