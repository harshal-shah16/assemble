package com.assemble.backend.controllers;

import com.assemble.backend.config.JwtTokenUtil;
import com.assemble.backend.model.entities.Answer;
import com.assemble.backend.services.AnswerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
public class AnswerController {
  private final AnswerService answerService;

  @Autowired
  public AnswerController(AnswerService answerService, JwtTokenUtil jwtTokenUtil) {
    this.answerService = answerService;
  }

  @PostMapping("/answers/{courseId}/{postId}")
  public ResponseEntity<Answer> createAnswerForPost(
          @RequestHeader("Authorization") String token,
          @PathVariable int courseId,
          @PathVariable int postId,
          @Valid @RequestBody Answer answer
  ) {
    return ResponseEntity.ok(answerService.createAnswer(courseId, postId, answer));
  }

  @PutMapping("/answers/{courseId}/{answerId}")
  public ResponseEntity<Answer> updateAnswer(
          @PathVariable("answerId") int answerId,
          @PathVariable("courseId") int courseId,
          @Valid @RequestBody Answer answer
  ) {
    return ResponseEntity.ok(answerService.updateAnswer(courseId, answerId, answer));
  }

  @PutMapping("/answers/{courseId}/{answerId}/likes/{userId}")
  public ResponseEntity<Answer> updateAnswerLikes(
          @PathVariable("answerId") int answerId,
          @PathVariable("courseId") int courseId,
          @PathVariable("userId") int userId
  ) {
    return ResponseEntity.ok(answerService.updateAnswerLikes(courseId, answerId, userId));
  }

  @DeleteMapping("/answers/{courseId}/{answerId}/likes/{userId}")
  public ResponseEntity<Answer> deleteAnswerLikes(
          @PathVariable("answerId") int answerId,
          @PathVariable("courseId") int courseId,
          @PathVariable("userId") int userId
  ) {
    return ResponseEntity.ok(answerService.deleteAnswerLikes(courseId, answerId, userId));
  }


  @DeleteMapping("/answers/{courseId}/{answerId}")
  public ResponseEntity<Answer> deleteAnswer(
          @PathVariable("answerId") int answerId,
          @PathVariable("courseId") int courseId
  ) {
    return ResponseEntity.ok(answerService.deleteAnswer(courseId, answerId));
  }


}
