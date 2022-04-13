package com.assemble.backend.model.repositories;


import com.assemble.backend.model.entities.Post;
import com.assemble.backend.model.entities.compositekeys.PostId;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, PostId> {

  List<Post> findByFeedIdAndStatus(int feedId, boolean status);

  int countByCourseId(int courseId);
}
