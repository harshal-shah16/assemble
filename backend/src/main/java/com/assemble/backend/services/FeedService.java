package com.assemble.backend.services;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.Feed;
import com.assemble.backend.model.repositories.FeedRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Service
public class FeedService {
  private final FeedRepository feedRepository;
  private final CourseRoleService courseRoleService;

  @Autowired
  public FeedService(FeedRepository feedRepository, CourseRoleService courseRoleService) {
    this.feedRepository = feedRepository;
    this.courseRoleService = courseRoleService;
  }

  public Feed createFeedForCourse(int courseId, Feed feed) {
    CourseRole role = courseRoleService.getCourseRole(courseId);
    if (role.getRole().equals("INSTRUCTOR")) {
      feed.setCourseId(courseId);
      feed.setCreatedByUserId(role.getUserId());
      return feedRepository.save(feed);
    } else {
      throw new IncorrectAccessLevelException(courseId, role);
    }
  }

  public Feed updateFeedForCourse(int courseId, int feedId, @Valid @RequestBody Feed feed) {
    CourseRole role = courseRoleService.getCourseRole(courseId);
    if (role.getRole().equals("INSTRUCTOR")) {
      Feed dbFeed = feedRepository.findById(feedId)
              .orElseThrow(() -> new RecordDoesNotExistException(feedId));
      dbFeed.updateChanges(feed);
      return feedRepository.save(dbFeed);
    } else {
      throw new IncorrectAccessLevelException(courseId, role);
    }
  }
}
