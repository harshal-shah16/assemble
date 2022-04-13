package com.assemble.backend.services;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.model.entities.CourseRole;
import com.assemble.backend.model.entities.Feed;
import com.assemble.backend.model.entities.Likes;
import com.assemble.backend.model.entities.Post;
import com.assemble.backend.model.entities.Question;
import com.assemble.backend.model.entities.compositekeys.PostId;
import com.assemble.backend.model.repositories.FeedRepository;
import com.assemble.backend.model.repositories.PostRepository;
import com.assemble.backend.model.repositories.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final QuestionRepository questionRepository;
  private final CourseRoleService courseRoleService;
  private final FeedRepository feedRepository;

  @Autowired
  public PostService(PostRepository postRepository,
                     QuestionRepository questionRepository,
                     CourseRoleService courseRoleRepository, FeedRepository feedRepository) {
    this.postRepository = postRepository;
    this.questionRepository = questionRepository;
    this.courseRoleService = courseRoleRepository;
    this.feedRepository = feedRepository;
  }

  public Post createPostForFeed(int feedId, Post post) {
    Feed feed =
            feedRepository.findById(feedId).orElseThrow(() -> new RecordDoesNotExistException(feedId));
    int postId = postRepository.countByCourseId(feed.getCourseId()) + 1;
    CourseRole courseRole = courseRoleService.getCourseRole(feed.getCourseId());
    post = new Post(feed.getCourseId(), postId,
                    courseRole.getUserId(), feedId, post.getPostTitle(), post.getPostBody(), true,
                    courseRole);
    Post dbPost = postRepository.save(post);
    dbPost.setQuestion(questionRepository.save(
            new Question(post.getCourseId(), post.getPostId(), false, new ArrayList<>())));
    return dbPost;
  }

  public List<Post> getPostsForFeed(int feedId) {
    Feed feed =
            feedRepository.findById(feedId).orElseThrow(() -> new RecordDoesNotExistException(feedId));
    courseRoleService.getCourseRole(feed.getCourseId()); // Validate authorization or throw
    return postRepository.findByFeedIdAndStatus(feed.getFeedId(), true);
  }

  public Post updatePost(int courseId, int postId, Post post) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    Post dbPost =
            postRepository.findById(new PostId(courseId,postId))
                    .orElseThrow(() -> new RecordDoesNotExistException(post));
    if (dbPost.getCreatedByUserId() == courseRole.getUserId()) {
      dbPost.updateChanges(post);
      return postRepository.save(dbPost);
    } else {
      throw new IncorrectAccessLevelException(dbPost, courseRole);
    }
  }

  public Post updatePostLikes(int courseId, int postId, int userId) {
    courseRoleService.getCourseRole(courseId);
    Post dbPost =
            postRepository.findById(new PostId(courseId,postId))
                    .orElseThrow(() -> new RecordDoesNotExistException(courseId, postId));
    Likes likes = dbPost.getLikes();
    if (!likes.userIds.contains(userId)) {
      likes.userIds.add(userId);
      return postRepository.save(dbPost);
    } else {
      throw new RuntimeException("A duplicate like request was sent.");
    }
  }


  public Post deletePostLikes(int courseId, int postId, int userId) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    Post dbPost =
            postRepository.findById(new PostId(courseId, postId))
                    .orElseThrow(() -> new RecordDoesNotExistException(courseId, postId));
    try {
      dbPost.getLikes().userIds.remove((Integer) userId);
      return postRepository.save(dbPost);
    } catch (NullPointerException e) {
      throw new IncorrectAccessLevelException(dbPost, courseRole);
    }
  }


  public Post deletePost(int postId, int courseId) {
    CourseRole courseRole = courseRoleService.getCourseRole(courseId);
    PostId id = new PostId(courseId, postId);
    Post dbPost = postRepository.findById(id)
            .orElseThrow(() -> new RecordDoesNotExistException(postId, courseId));
    dbPost.setStatus(false);
    if (dbPost.getCreatedByUserId() == courseRole.getUserId()) {
      return postRepository.save(dbPost);
    } else {
      throw new IncorrectAccessLevelException(dbPost, courseRole);
    }
  }
}
