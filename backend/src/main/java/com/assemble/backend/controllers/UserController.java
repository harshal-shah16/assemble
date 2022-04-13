package com.assemble.backend.controllers;

import com.assemble.backend.model.entities.User;
import com.assemble.backend.model.repositories.UserRepository;
import com.assemble.backend.services.util.Login;
import com.assemble.backend.util.Password;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
public class UserController {

  private final UserRepository userRepository;

  private final PasswordEncoder bcryptEncoder;

  @Autowired
  public UserController(PasswordEncoder bcryptEncoder, UserRepository userRepository) {
    this.bcryptEncoder = bcryptEncoder;
    this.userRepository = userRepository;
  }


  @PostMapping("/register")
  public ResponseEntity<Object> signUp(@Valid @RequestBody User newUser) {
//              .body(new ErrorDetail("Incomplete Details for Registration"));
//              .body(new ErrorDetail("Email Already exists!"));
    newUser.setPassword(bcryptEncoder.encode(newUser.getPassword()));
    return ResponseEntity.ok(userRepository.save(newUser));
  }


  @GetMapping("/users/{email}")
  public ResponseEntity getUserDetails(@Valid @PathVariable String email) {

    if (email == null || email.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorDetail("Incomplete Details for Registration"));
    }
    try {
      User validUser = userRepository.findByEmail(email).get();
      validUser.setPassword("");
      return ResponseEntity.ok(validUser);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDetail("Email Not Found"));
    }
  }


  @PostMapping("/login")
  public ResponseEntity login(@Valid @RequestBody Login login) {

    if (login.getEmail().isEmpty() || login.getPassword().isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorDetail("Email or Password Empty"));
    }

    User newUser = new User();
    User validUser;
    try {
      validUser = userRepository.findByEmail(login.getEmail()).get();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new ErrorDetail("Email not registered"));
    }
    boolean check = Password.checkPassword(login.getPassword(), validUser.getPassword());

    if (check) {
      newUser.setEmail(validUser.getEmail());
      newUser.setCreatedAt(validUser.getCreatedAt());
      newUser.setUpdatedAt(validUser.getUpdatedAt());
      //newUser.setPassword(login.getPassword());
      newUser.setUserId(validUser.getUserId());
      newUser.setFirstName(validUser.getFirstName());
      newUser.setLastName(validUser.getLastName());
      return ResponseEntity.ok(newUser);
    }

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorDetail("Incorrect "
                                                                              + "Password"));

  }

}
