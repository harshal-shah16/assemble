package com.assemble.backend.model.repositories;

import com.assemble.backend.model.entities.Course;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends CrudRepository<Course, Integer> {

}
