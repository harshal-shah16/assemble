package com.assemble.backend.exceptions;

import com.assemble.backend.model.entities.CourseRole;

public class UserUnauthorizedToCourseException extends RuntimeException {
  public UserUnauthorizedToCourseException(int courseId) {
    super("User is not authorized for course number " + courseId);
  }
}
