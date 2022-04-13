package com.assemble.backend.model.jwt;

import java.io.Serializable;

import javax.persistence.Column;

public class JwtResponse implements Serializable {

  private static final long serialVersionUID = -8091879091924046844L;
  private final String jwtToken;
  private final int userId;
  private final String firstName;
  private final String lastName;

  public int getUserId() {
    return userId;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getEmail() {
    return email;
  }

  private final String email;


  public JwtResponse(String jwtToken, int userId, String firstName, String lastName, String email) {
    this.jwtToken = jwtToken;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public String getToken() {
    return this.jwtToken;
  }
}