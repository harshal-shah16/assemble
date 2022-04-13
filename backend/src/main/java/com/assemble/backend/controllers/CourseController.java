package com.assemble.backend.controllers;

import com.assemble.backend.model.entities.Course;
import com.assemble.backend.services.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/courses/")
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
public class CourseController {

  private final CourseService courseService;

  @Autowired
  public CourseController(CourseService courseService) {
    this.courseService = courseService;
  }

  @GetMapping
  public ResponseEntity<List<Course>> getCourseEnrollments() {
    List<Course> roles = courseService.getCourseEnrollments();
    return ResponseEntity.ok(roles);
  }

  @PutMapping("{courseId}")
  public ResponseEntity<Course> updateCourse(@PathVariable("courseId") int courseId,
                                             @Valid @RequestBody Course course) {
    Course courseToUpdate = courseService.updateCourse(courseId, course);
    return ResponseEntity.ok(courseToUpdate);
  }

  @PostMapping
  public ResponseEntity<Course> createCourse(@Valid @RequestBody Course course) {
    Course newCourse = courseService.createCourse(course);
    return ResponseEntity.ok(newCourse);
  }

}
