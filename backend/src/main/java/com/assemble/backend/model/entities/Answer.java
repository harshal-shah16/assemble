package com.assemble.backend.model.entities;

import com.assemble.backend.util.LikeConverter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int answerId;
  @Column
  @NotNull
  private int postId;
  @Column
  @NotNull
  private int createdByUserId;
  @Column
  @NotNull
  private int courseId;
  @Column
  @NotNull
  @Size(min = 1, max = 5000, message = "Answer content must be between have 1 and 5000 characters.")
  private String content;
  @Column
  @CreationTimestamp
  private Timestamp createdAt;

  @Column
  @UpdateTimestamp
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

  /**
   * Constructor for non auto-generated columns
   *
   * @param createdByUserId user id
   * @param courseId        course id
   * @param postId          post id
   * @param content         content
   * @param courseRole      role
   */
  public Answer(@NotNull int createdByUserId, int courseId, int postId, String content,
                CourseRole courseRole) {
    this.createdByUserId = createdByUserId;
    this.courseId = courseId;
    this.postId = postId;
    this.content = content;
    this.courseRole = courseRole;
    this.likes = new Likes();
  }

  public void updateChanges(Answer newObject) {
    if (newObject.content != null && !this.content.equals(newObject.content)) {
      this.content = newObject.content;
    }
  }
}
