package com.assemble.backend.services;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.Post;
import com.assemble.backend.model.entities.Question;
import com.assemble.backend.model.entities.compositekeys.PostId;
import com.assemble.backend.model.repositories.PostRepository;
import com.assemble.backend.model.repositories.QuestionRepository;

import org.springframework.stereotype.Service;

@Service
public class QuestionService {
  private final QuestionRepository questionRepository;
  private final CourseRoleService courseRoleService;
  private final PostRepository postRepository;

  public QuestionService(QuestionRepository questionRepository,
                         CourseRoleService courseRoleService, PostRepository postRepository) {
    this.questionRepository = questionRepository;
    this.courseRoleService = courseRoleService;
    this.postRepository = postRepository;
  }

  public Question updateQuestion(int courseId, int postId, Question question) {
    CourseRole role = courseRoleService.getCourseRole(courseId);
    PostId id = new PostId(courseId, postId);
    Post dbPost = postRepository.findById(id)
            .orElseThrow(() -> new RecordDoesNotExistException(id));
    if (dbPost.getCreatedByUserId() == role.getUserId()) {
      Question dbQuestion =
              questionRepository.findById(id).orElseThrow(() -> new RecordDoesNotExistException(id));
      dbQuestion.updateChanges(question);
      return questionRepository.save(dbQuestion);
    } else {
      throw new IncorrectAccessLevelException(role,id);
    }

  }

}
