package com.assemble.backend.model.entities;

import com.assemble.backend.model.entities.compositekeys.PostId;
import com.assemble.backend.util.LikeConverter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@IdClass(PostId.class)
public class Post implements Serializable {

  @Id
  @Column
  private int courseId;
  @Id
  @Column
  private int postId;
  @Column
  @NotNull
  private int createdByUserId;
  @Column
  private int feedId;
  @Column
  private String postTitle;
  @Column
  private String postBody;
  @Column
  private boolean status;
  @Column
  private Timestamp createdAt;
  @Column
  private Timestamp updatedAt;

  @Column
  @Convert(converter = LikeConverter.class)
  private Likes likes;

  @ManyToOne
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  @JoinColumns({
          @JoinColumn(name = "createdByUserId", referencedColumnName = "userId"
                  , updatable = false, insertable = false),
          @JoinColumn(name = "courseId", referencedColumnName = "courseId"
                  , updatable = false, insertable = false)})
  private CourseRole courseRole;

  @OneToOne(cascade = CascadeType.ALL)
  @ToString.Exclude
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  @JoinColumns({
          @JoinColumn(name = "postId", referencedColumnName = "postId"
                  , updatable = false, insertable = false),
          @JoinColumn(name = "courseId", referencedColumnName = "courseId"
                  , updatable = false, insertable = false)})
  private Question question;


  @OneToMany
  @ToString.Exclude
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  @JoinColumns(
          {@JoinColumn(name = "courseId", referencedColumnName = "courseId"
                  , updatable = false, insertable = false),
                  @JoinColumn(name = "postId", referencedColumnName = "postId"
                          , updatable = false, insertable = false)})
  private List<PostComment> comments;

  /**
   * Constructor for non auto-generated columns
   *
   * @param createdByUserId user id
   * @param courseId        course id
   * @param postId          post id
   * @param postTitle       post title
   * @param postBody        post body
   * @param courseRole      course role
   */
  public Post(int courseId, int postId,@NotNull int createdByUserId, int feedId, String postTitle,
              String postBody,boolean status, CourseRole courseRole) {
    this.courseId = courseId;
    this.postId = postId;
    this.createdByUserId = createdByUserId;
    this.feedId = feedId;
    this.postTitle = postTitle;
    this.postBody = postBody;
    this.status = status;
    this.courseRole = courseRole;
    this.comments = new ArrayList<>();
    this.likes = new Likes();
    this.createdAt = new Timestamp(System.currentTimeMillis());
    this.updatedAt = createdAt;
  }

  public void updateChanges(Post newObject) {
    if (newObject.postTitle != null && !this.postTitle.equals(newObject.postTitle)) {
      this.postTitle = newObject.postTitle;
    }
    if (newObject.postBody != null && !this.postBody.equals(newObject.postBody)) {
      this.postBody = newObject.postBody;
    }
    if (this.status != newObject.status) {
      this.status = newObject.status;
    }
    this.updatedAt = new Timestamp(System.currentTimeMillis());
  }

}
