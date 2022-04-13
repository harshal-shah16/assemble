package com.assemble.backend.model.repositories;

import com.assemble.backend.model.entities.compositekeys.PostId;
import com.assemble.backend.model.entities.Question;

import org.springframework.data.repository.CrudRepository;

public interface QuestionRepository extends CrudRepository<Question, PostId> {
}
