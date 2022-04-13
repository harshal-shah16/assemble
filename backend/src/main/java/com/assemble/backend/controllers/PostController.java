package com.assemble.backend.controllers;

import com.assemble.backend.model.entities.Post;
import com.assemble.backend.model.entities.compositekeys.PostId;
import com.assemble.backend.services.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
public class PostController {
  private final PostService postService;

  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }


  @PostMapping("/posts/{feedId}")
  public ResponseEntity<Post> createPostForFeed(@PathVariable int feedId,
                                                @Valid @RequestBody Post post) {
    return ResponseEntity.ok(postService.createPostForFeed(feedId, post));
  }


  @GetMapping("/posts/{feedId}")
  public ResponseEntity<List<Post>> getPostsForFeed(@PathVariable int feedId) {
    return ResponseEntity.ok(postService.getPostsForFeed(feedId));
  }

  @PutMapping("/posts/{courseId}/{postId}")
  public ResponseEntity<Post> updatePost(
          @PathVariable("courseId") int courseId,
          @PathVariable("postId") int postId,
          @Valid @RequestBody Post post
  ) {
    return ResponseEntity.ok(postService.updatePost(courseId,postId,post));
  }


  @PutMapping("/posts/{courseId}/{postId}/likes/{userId}")
  public ResponseEntity<Post> updatePostLikes(
          @PathVariable("courseId") int courseId,
          @PathVariable("postId") int postId,
          @PathVariable int userId
  ) {
    return ResponseEntity.ok(postService.updatePostLikes(courseId,postId,userId));
  }


  @DeleteMapping("/posts/{courseId}/{postId}/likes/{userId}")
  public ResponseEntity<Post> deletePostLikes(
          @PathVariable("courseId") int courseId,
          @PathVariable("postId") int postId,
          @PathVariable int userId
  ) {
    return ResponseEntity.ok(postService.deletePostLikes(courseId,postId,userId));
  }


  @DeleteMapping("/posts/{courseId}/{postId}")
  public ResponseEntity<Post> deletePost(
          @PathVariable("courseId") int courseId,
          @PathVariable("postId") int postId
  ) {
    return ResponseEntity.ok(postService.deletePost(postId, courseId));
  }

}
