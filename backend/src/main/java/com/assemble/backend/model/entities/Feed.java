package com.assemble.backend.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Feed {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int feedId;
  @Column
  @NotNull
  @JsonIgnore
  private int createdByUserId;
  @Column
  private int courseId;
  @Column
  @NotNull
  @Size(min = 1, max = 5000, message = "Answer content must be between have 1 and 45 characters.")
  private String feedName;
  @Column
  @CreationTimestamp
  private Timestamp createdAt;

  @Column
  @UpdateTimestamp
  private Timestamp updatedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  @ToString.Exclude
  @JoinColumn(name = "courseId", referencedColumnName = "courseId"
          , updatable = false, insertable = false)
  private Course course;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  @JoinColumns({
          @JoinColumn(name = "createdByUserId", referencedColumnName = "userId"
                  , updatable = false, insertable = false),
          @JoinColumn(name = "courseId", referencedColumnName = "courseId"
                  , updatable = false, insertable = false)})
  private CourseRole courseRole;

  public void updateChanges(Feed newObject) {
    if (newObject.feedName != null && !this.feedName.equals(newObject.feedName)) {
      this.feedName = newObject.feedName;
    }
  }
}
