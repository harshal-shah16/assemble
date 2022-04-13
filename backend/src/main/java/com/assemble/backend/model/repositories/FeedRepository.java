package com.assemble.backend.model.repositories;


import com.assemble.backend.model.entities.Feed;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends CrudRepository<Feed, Integer> {

  List<Feed> findAllByCourseId(int courseId);
}
