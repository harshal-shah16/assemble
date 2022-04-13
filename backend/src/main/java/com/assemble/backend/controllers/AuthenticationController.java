package com.assemble.backend.controllers;

import com.assemble.backend.config.JwtTokenUtil;
import com.assemble.backend.model.entities.User;
import com.assemble.backend.model.jwt.JwtRequest;
import com.assemble.backend.model.jwt.JwtResponse;
import com.assemble.backend.model.repositories.UserRepository;
import com.assemble.backend.util.JwtUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
public class AuthenticationController {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenUtil jwtTokenUtil;
  private final UserRepository userRepository;
  private final JwtUserDetailsService jwtInMemoryUserDetailsService;



  @Autowired
  public AuthenticationController(AuthenticationManager authenticationManager,
                                  JwtTokenUtil jwtTokenUtil, UserRepository userRepository,
                                  JwtUserDetailsService jwtInMemoryUserDetailsService) {
    this.authenticationManager = authenticationManager;
    this.jwtTokenUtil = jwtTokenUtil;
    this.userRepository = userRepository;
    this.jwtInMemoryUserDetailsService = jwtInMemoryUserDetailsService;
  }

  @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
  public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
          throws Exception {

    User validUser = userRepository.findByEmail(authenticationRequest.getUsername()).get();

    authenticate(String.valueOf(validUser.getUserId()), authenticationRequest.getPassword());

    final UserDetails userDetails = jwtInMemoryUserDetailsService
            .loadUserByUsername(String.valueOf(validUser.getUserId()));

    final String token = jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new JwtResponse(token, validUser.getUserId(), validUser.getFirstName(),
                                             validUser.getLastName(), validUser.getEmail()));
  }

  private void authenticate(String userId, String password) throws Exception {
    Objects.requireNonNull(userId);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userId,
                                                                                 password));
    } catch (DisabledException e) {
      throw new Exception("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new Exception("INVALID_CREDENTIALS", e);
    }
  }
}
