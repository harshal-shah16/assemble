package com.assemble.backend.controllers;

import com.assemble.backend.model.entities.Answer;
import com.assemble.backend.model.entities.Post;
import com.assemble.backend.model.entities.PostComment;
import com.assemble.backend.services.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
public class PostCommentController {
  private final CommentService commentService;

  @Autowired
  public PostCommentController(CommentService commentService) {
    this.commentService = commentService;
  }


  @PostMapping("/comments/{courseId}/{postId}")
  public ResponseEntity<PostComment> createCommentForPost(
          @PathVariable("courseId") int courseId,
          @PathVariable("postId") int postId,
          @Valid @RequestBody PostComment comment
  ) {
    return ResponseEntity.ok(commentService.createPostComment(courseId, postId, comment));
  }

  @PutMapping("/comments/{courseId}/{commentId}")
  public ResponseEntity<PostComment> updateComment(
          @PathVariable int courseId,
          @PathVariable int commentId,
          @Valid @RequestBody PostComment comment
  ) {
    return ResponseEntity.ok(commentService.updatePostComment(courseId, commentId, comment));
  }


  @DeleteMapping("/comments/{courseId}/{commentId}")
  public ResponseEntity<PostComment> deleteComment(
          @PathVariable int courseId,
          @PathVariable int commentId
  ) {
    return ResponseEntity.ok(commentService.deletePostComment(courseId, commentId));
  }


  @PutMapping("/comments/{courseId}/{commentId}/likes/{userId}")
  public ResponseEntity<PostComment> updateCommentLikes(
          @PathVariable("commentId") int commentId,
          @PathVariable("courseId") int courseId,
          @PathVariable("userId") int userId
  ) {
    return ResponseEntity.ok(commentService.updateCommentLikes(courseId, commentId, userId));
  }

  @DeleteMapping("/comments/{courseId}/{commentId}/likes/{userId}")
  public ResponseEntity<PostComment> deleteCommentLikes(
          @PathVariable("commentId") int commentId,
          @PathVariable("courseId") int courseId,
          @PathVariable("userId") int userId
  ) {
    return ResponseEntity.ok(commentService.deleteCommentLikes(courseId, commentId, userId));
  }

}
