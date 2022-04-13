package com.assemble.backend.controllers;

import com.assemble.backend.model.entities.Question;
import com.assemble.backend.services.QuestionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
public class QuestionController {
  private final QuestionService questionService;

  public QuestionController(QuestionService questionService) {
    this.questionService = questionService;
  }


  @PutMapping("/questions/{courseId}/{postId}")
  public ResponseEntity<Question> updateQuestion(
          @PathVariable("courseId") int courseId,
          @PathVariable("postId") int postId,
          @RequestBody Question question
  ) {
    return ResponseEntity.ok(questionService.updateQuestion(courseId, postId, question));
  }
}
