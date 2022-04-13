package com.assemble.backend.model.repositories;


import com.assemble.backend.model.entities.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
  Optional<User> findByEmail(String email);

  Boolean existsByEmailContaining(String value);
}
