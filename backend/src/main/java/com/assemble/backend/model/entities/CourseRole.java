package com.assemble.backend.model.entities;


import com.assemble.backend.model.entities.compositekeys.RoleId;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@IdClass(RoleId.class)
public class CourseRole {
  @Id
  @Column
  private int userId;

  @Id
  @Column
  private int courseId;

  @Column(columnDefinition = "ENUM('STUDENT', 'INSTRUCTOR')")
  @NotNull
  private String role;

  @Column
  @ToString.Exclude
  @CreationTimestamp
  private Timestamp createdAt;

  @Column
  @ToString.Exclude
  @UpdateTimestamp
  private Timestamp updatedAt;

  @ManyToOne
  @ToString.Exclude
  @JoinColumn(name = "userId", referencedColumnName = "userId"
          , updatable = false, insertable = false)
  private User user;

  @ManyToOne
  @JsonIgnore
  @ToString.Exclude
  @JoinColumn(name = "courseId", referencedColumnName = "courseId"
          , updatable = false, insertable = false)
  private Course course;

  /**
   * A constructor for non auto generated values
   *
   * @param userId   user id
   * @param courseId course id
   * @param role     role
   */
  public CourseRole(int userId, int courseId, @NotNull String role) {
    this.userId = userId;
    this.courseId = courseId;
    this.role = role;
  }
}
