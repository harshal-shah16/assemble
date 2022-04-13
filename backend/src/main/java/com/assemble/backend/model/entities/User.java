package com.assemble.backend.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int userId;
  @Column
  @NotNull
  @NotEmpty(message = "First name cannot be empty.")
  private String firstName;
  @Column
  @NotNull
  @NotEmpty(message = "Last name cannot be empty.")
  private String lastName;
  @Column
  @NotNull
  @NotEmpty(message = "Email cannot be empty.")
  private String email;
  @Column
  @NotEmpty
  @NotNull(message = "Password cannot be empty.")
  private String password;

  @Column
  @CreationTimestamp
  @JsonIgnore
  private Timestamp createdAt;

  @Column
  @UpdateTimestamp
  @JsonIgnore
  private Timestamp updatedAt;

  @JsonIgnore
  public String getPassword() {
    return password;
  }

  @JsonProperty
  public void setPassword(String password) {
    this.password = password;
  }
}
