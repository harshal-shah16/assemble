package com.assemble.backend.model.entities;

import com.assemble.backend.model.entities.compositekeys.PostId;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@IdClass(PostId.class)
public class Question {
  @Id
  @Column
  private int courseId;
  @Id
  @Column
  private int postId;
  @Column
  private boolean isResolved;

  @OneToMany
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  @JoinColumns(
          {@JoinColumn(name = "courseId", referencedColumnName = "courseId"
                  , updatable = false, insertable = false),
                  @JoinColumn(name = "postId", referencedColumnName = "postId"
                          , updatable = false, insertable = false)})
  private List<Answer> answers;

  public void updateChanges(Question newObject) {
    if (newObject.isResolved != this.isResolved) {
      this.isResolved = newObject.isResolved;
    }
  }
}
