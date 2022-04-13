package com.assemble.backend.model.repositories;

import com.assemble.backend.model.entities.Answer;
import com.assemble.backend.model.entities.compositekeys.PostId;

import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface AnswerRepository extends CrudRepository<Answer, Integer> {
}
