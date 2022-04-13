package com.assemble.backend.util;

import com.assemble.backend.model.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
    com.assemble.backend.model.entities.User user =
            userRepository.findById(Integer.parseInt(userId)).get();
    if (user == null) {
      throw new UsernameNotFoundException("User not found with user id: " + userId);
    }
    return new org.springframework.security.core.userdetails.User(String.valueOf(user.getUserId()),
                                                                  user.getPassword(),
                                                                  new ArrayList<>());
  }
}

