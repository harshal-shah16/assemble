package com.assemble.backend.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  @Column
  private int courseId;
  @Column
  @NotNull
  @JsonIgnore
  private int createdByUserId;
  @Column
  private String courseName;
  @Column
  private int status;

  @Column
  @CreationTimestamp
  private Timestamp createdAt;

  @Column
  @UpdateTimestamp
  private Timestamp updatedAt;

  @OneToMany
  @JoinColumn(name = "courseId", referencedColumnName = "courseId"
          , updatable = false, insertable = false)
  private List<CourseRole> courseRoles;

  @OneToMany
  @JoinColumn(name = "courseId", referencedColumnName = "courseId"
          , updatable = false, insertable = false)
  private List<Feed> feeds;


  public void updateChanges(Course newObject) {
    if (newObject.courseName != null && !this.courseName.equals(newObject.courseName)) {
      this.courseName = newObject.courseName;
    }
    if (this.status != newObject.status) {
      this.status = newObject.status;
    }
  }
}
