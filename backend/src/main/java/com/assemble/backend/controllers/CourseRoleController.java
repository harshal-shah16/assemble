package com.assemble.backend.controllers;

import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.compositekeys.RoleId;
import com.assemble.backend.services.CourseRoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://app-assemble.herokuapp.com"})
@RequestMapping("/api/roles")
public class CourseRoleController {
  private final CourseRoleService courseRoleService;

  @Autowired
  public CourseRoleController(CourseRoleService courseRoleService) {
    this.courseRoleService = courseRoleService;
  }

  @PostMapping("/{courseId}/{email}")
  public ResponseEntity<CourseRole> createRoleForCourse(
          @PathVariable("courseId") int courseId,
          @PathVariable("email") String email,
          @RequestBody CourseRole courseRole
  ) {
    return ResponseEntity.ok(courseRoleService.createRoleForCourse(courseId, email, courseRole));
  }

  @DeleteMapping("/{courseId}/{userId}")
  public ResponseEntity<RoleId> deleteRoleForCourse(
          @PathVariable("userId") int userId,
          @PathVariable("courseId") int courseId
  ) {
    return ResponseEntity.ok(courseRoleService.deleteRoleForCourse(userId, courseId));
  }
}
