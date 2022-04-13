package com.assemble.backend.services;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.model.entities.Answer;
import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.Likes;
import com.assemble.backend.model.entities.PostComment;
import com.assemble.backend.model.repositories.PostCommentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  private final PostCommentRepository postCommentRepository;
  private final CourseRoleService courseRoleService;

  @Autowired
  public CommentService(PostCommentRepository postCommentRepository,
      CourseRoleService courseRoleService) {
    this.postCommentRepository = postCommentRepository;
    this.courseRoleService = courseRoleService;
  }

  public PostComment createPostComment(int courseId, int postId, PostComment comment) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    comment = new PostComment(courseRole.getUserId(), courseId, postId, comment.getContent(),
        courseRole);
    return postCommentRepository.save(comment);
  }

  public PostComment updatePostComment(int courseId, int commentId,
      PostComment comment) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);

    PostComment dbComment = postCommentRepository.findById(commentId)
        .orElseThrow(() -> new RecordDoesNotExistException(commentId));

    if (courseRole.getUserId() == dbComment.getCreatedByUserId()) {
      dbComment.updateChanges(comment);
      return postCommentRepository.save(dbComment);
    } else {
      throw new IncorrectAccessLevelException(dbComment, courseRole);
    }
  }


  public PostComment deletePostComment(int courseId, int commentId) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    PostComment dbComment =
        postCommentRepository.findById(commentId)
            .orElseThrow(() -> new RecordDoesNotExistException(commentId));
    if (dbComment.getCreatedByUserId() == courseRole.getUserId()) {
      postCommentRepository.deleteById(commentId);
      return dbComment;
    } else {
      throw new IncorrectAccessLevelException(dbComment, courseRole);
    }
  }


  public PostComment updateCommentLikes(int courseId, int commentId, int userId) {
    courseRoleService.getCourseRole(courseId);
     PostComment dbComment =
            postCommentRepository.findById(commentId)
                    .orElseThrow(() -> new RecordDoesNotExistException(commentId));
    Likes likes = dbComment.getLikes();
    if (!likes.userIds.contains(userId)) {
      likes.userIds.add(userId);
      return postCommentRepository.save(dbComment);
    } else {
      throw new RuntimeException("A duplicate like request was sent.");
    }
  }


  public PostComment deleteCommentLikes(int courseId, int commentId, int userId) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    PostComment dbComment =
            postCommentRepository.findById(commentId)
                    .orElseThrow(() -> new RecordDoesNotExistException(commentId));
    try {
      dbComment.getLikes().userIds.remove((Integer) userId);
      return postCommentRepository.save(dbComment);
    } catch (NullPointerException e) {
      throw new IncorrectAccessLevelException(dbComment, courseRole);
    }
  }
}
