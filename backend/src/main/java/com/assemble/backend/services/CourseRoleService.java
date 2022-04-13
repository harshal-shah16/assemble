package com.assemble.backend.services;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.exceptions.UserUnauthorizedToCourseException;
import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.compositekeys.RoleId;
import com.assemble.backend.model.repositories.CourseRoleRepository;
import com.assemble.backend.model.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class CourseRoleService {
  private final CourseRoleRepository courseRoleRepository;
  private final UserRepository userRepository;

  @Autowired
  public CourseRoleService(CourseRoleRepository courseRoleRepository, UserRepository userRepository) {
    this.courseRoleRepository = courseRoleRepository;
    this.userRepository = userRepository;
  }


  public int retrieveUserid() {
    return Integer.parseInt(((User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal()).getUsername());
  }

  public CourseRole getCourseRole(int courseId) {
    return this.courseRoleRepository
            .findById(new RoleId(retrieveUserid(), courseId))
            .orElseThrow(() -> new UserUnauthorizedToCourseException(courseId));
  }

  public RoleId deleteRoleForCourse(int userId, int courseId) {
    if (getCourseRole(courseId).getRole().equals("INSTRUCTOR")) {
      RoleId id = new RoleId(userId, courseId);
      courseRoleRepository.deleteById(id);
      return id;
    } else {
      throw new IncorrectAccessLevelException(courseId);
    }
  }

  public CourseRole createRoleForCourse(int courseId, String email, CourseRole courseRole) {
    if (getCourseRole(courseId).getRole().equals("INSTRUCTOR")) {
      com.assemble.backend.model.entities.User user =  userRepository.findByEmail(email)
              .orElseThrow(() -> new RecordDoesNotExistException(email));
      courseRole.setUserId(user.getUserId());
      courseRole.setCourseId(courseId);
      courseRole.setUser(user);
      return courseRoleRepository.save(courseRole);
    } else {
      throw new IncorrectAccessLevelException(courseId);
    }
  }
}
