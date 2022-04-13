package com.assemble.backend.model.repositories;

import com.assemble.backend.model.entities.PostComment;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostCommentRepository  extends CrudRepository<PostComment, Integer> {
  List<PostComment> findAllByPostIdAndCourseId(int postId, int courseId);
}
