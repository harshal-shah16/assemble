package com.assemble.backend.model.entities;

import com.assemble.backend.util.LikeConverter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class PostComment {
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int commentId;
  @Column
  @NotNull
  private int createdByUserId;
  @Column
  private int courseId;
  @Column
  private int postId;
  @Column
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

  @ManyToOne(fetch = FetchType.LAZY)
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
   * @param courseId course id
   * @param postId post id
   * @param content content
   * @param courseRole role
   */
  public PostComment(@NotNull int createdByUserId, int courseId, int postId, String content,
                     CourseRole courseRole) {
    this.createdByUserId = createdByUserId;
    this.courseId = courseId;
    this.postId = postId;
    this.content = content;
    this.courseRole = courseRole;
    this.likes = new Likes();
  }

  public void updateChanges(PostComment newObject){
    if(newObject.content != null && !this.content.equals(newObject.content)){
      this.content = newObject.content;
    }
  }
}
