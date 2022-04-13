package com.assemble.backend.services;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.model.entities.Course;
import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.compositekeys.RoleId;
import com.assemble.backend.model.repositories.CourseRepository;
import com.assemble.backend.model.repositories.CourseRoleRepository;
import com.assemble.backend.model.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CourseService {
  private final CourseRepository courseRepository;
  private final CourseRoleRepository courseRoleRepository;
  private final CourseRoleService courseRoleService;
  private final UserRepository userRepository;

  @Autowired
  public CourseService(CourseRepository courseRepository,
                       CourseRoleRepository courseRoleRepository,
                       CourseRoleService courseRoleService, UserRepository userRepository) {
    this.courseRepository = courseRepository;
    this.courseRoleRepository = courseRoleRepository;
    this.courseRoleService = courseRoleService;
    this.userRepository = userRepository;
  }

  public List<Course> getCourseEnrollments() {
    int userId = courseRoleService.retrieveUserid();
    return StreamSupport.stream(courseRoleRepository.findAllByUserId(userId).spliterator(),
                                false).map(CourseRole::getCourse).collect(Collectors.toList());
  }

  public Course updateCourse(int courseId, Course course) {
    RoleId roleId = new RoleId(courseRoleService.retrieveUserid(), courseId);
    courseRoleRepository.findById(roleId
    )
            .orElseThrow(() -> new IncorrectAccessLevelException(courseId));
    Course dbCourse =
            courseRepository.findById(courseId).orElseThrow(()-> new RecordDoesNotExistException(courseId));
    dbCourse.updateChanges(course);
    return courseRepository.save(dbCourse);
  }

  public Course createCourse(Course course) {
    int userId = courseRoleService.retrieveUserid();
    course.setCreatedByUserId(userId);
    course.setStatus(1);
    Course dbCourse = courseRepository.save(course);
    CourseRole role = courseRoleRepository.save(new CourseRole(userId, dbCourse.getCourseId(),
                                                               "INSTRUCTOR"));
    role.setUser(userRepository.findById(userId).orElse(null));
    dbCourse.setCourseRoles(
            new ArrayList<>(Collections.singletonList(role)));
    dbCourse.setFeeds(new ArrayList<>());
    return dbCourse;
  }
}
