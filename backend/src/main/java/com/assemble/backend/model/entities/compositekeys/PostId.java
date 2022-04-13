package com.assemble.backend.model.entities.compositekeys;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostId implements Serializable {
  private int courseId;
  private int postId;
}
