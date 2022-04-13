package com.assemble.backend.controllers;


import com.assemble.backend.model.entities.Feed;
import com.assemble.backend.services.FeedService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
@RequestMapping("/api/feeds")
public class FeedController {
  private final FeedService feedService;

  @Autowired
  public FeedController(FeedService feedService) {
    this.feedService = feedService;
  }

  @PostMapping("/{courseId}")
  public ResponseEntity<Feed> createFeedForCourse(
          @PathVariable("courseId") int courseId,
          @Valid @RequestBody Feed feed) {
    return ResponseEntity.ok(feedService.createFeedForCourse(courseId, feed));
  }

  @PutMapping("/{courseId}/{feedId}")
  public ResponseEntity<Feed> updateFeedForCourse(
          @PathVariable("courseId") int courseId,
          @PathVariable("feedId") int feedId,
          @Valid @RequestBody Feed feed) {
    return ResponseEntity.ok(feedService.updateFeedForCourse(courseId,feedId, feed));
  }
}
