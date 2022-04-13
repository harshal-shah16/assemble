package com.assemble.backend.model.repositories;


import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.compositekeys.RoleId;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRoleRepository extends CrudRepository<CourseRole, RoleId> {
  Iterable<CourseRole> findAllByUserId(int userId);

  List<CourseRole> findAllByCourseId(int courseId);

  List<CourseRole> findAllByUserIdAndRoleEquals(int userId,String role);
}
