package com.assemble.backend.services;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.model.entities.Answer;
import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.Likes;
import com.assemble.backend.model.entities.Question;
import com.assemble.backend.model.entities.compositekeys.PostId;
import com.assemble.backend.model.repositories.AnswerRepository;
import com.assemble.backend.model.repositories.CourseRoleRepository;
import com.assemble.backend.model.repositories.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
  private final AnswerRepository answerRepository;
  private final CourseRoleService courseRoleService;
  private final QuestionRepository questionRepository;

  @Autowired
  public AnswerService(AnswerRepository answerRepository,
                       CourseRoleRepository courseRoleRepository,
                       CourseRoleService courseRoleService, QuestionRepository questionRepository) {
    this.answerRepository = answerRepository;
    this.courseRoleService = courseRoleService;
    this.questionRepository = questionRepository;
  }

  public Answer createAnswer(int courseId, int postId, Answer answer) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    answer = new Answer(courseRole.getUserId(), courseId, postId, answer.getContent(),
                        courseRole);
    Question dbQuestion = questionRepository.findById(new PostId(courseId, postId))
                    .orElseThrow(() -> new RecordDoesNotExistException(courseId, postId));
    dbQuestion.setResolved(true);
    questionRepository.save(dbQuestion);
    return answerRepository.save(answer);
  }

  public Answer updateAnswer(int courseId, int answerId, Answer answer) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);

    Answer dbAnswer = answerRepository.findById(answerId)
            .orElseThrow(() -> new RecordDoesNotExistException(answerId));

    if (dbAnswer.getCreatedByUserId() == courseRole.getUserId()) {
      dbAnswer.updateChanges(answer);
      return answerRepository.save(dbAnswer);
    } else {
      throw new IncorrectAccessLevelException(dbAnswer, courseRole);
    }
  }


  public Answer updateAnswerLikes(int courseId, int answerId, int userId) {
    courseRoleService.getCourseRole(courseId);
    Answer dbAnswer =
            answerRepository.findById(answerId)
                    .orElseThrow(() -> new RecordDoesNotExistException(answerId));
    Likes likes = dbAnswer.getLikes();
    if (!likes.userIds.contains(userId)) {
      likes.userIds.add(userId);
      return answerRepository.save(dbAnswer);
    } else {
      throw new RuntimeException("A duplicate like request was sent.");
    }
  }


  public Answer deleteAnswerLikes(int courseId, int answerId, int userId) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    Answer dbAnswer =
            answerRepository.findById(answerId)
                    .orElseThrow(() -> new RecordDoesNotExistException(answerId));
    try {
      dbAnswer.getLikes().userIds.remove((Integer) userId);
      return answerRepository.save(dbAnswer);
    } catch (NullPointerException e) {
      throw new IncorrectAccessLevelException(dbAnswer, courseRole);
    }
  }


  public Answer deleteAnswer(int courseId, int answerId) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    Answer dbAnswer = answerRepository.findById(answerId)
            .orElseThrow(() -> new RecordDoesNotExistException(answerId));
    if (dbAnswer.getCreatedByUserId() == courseRole.getUserId()) {
      answerRepository.deleteById(answerId);
      return dbAnswer;
    } else {
      throw new IncorrectAccessLevelException(dbAnswer, courseRole);
    }
  }

}
