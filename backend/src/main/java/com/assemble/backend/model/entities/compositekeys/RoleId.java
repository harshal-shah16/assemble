package com.assemble.backend.model.entities.compositekeys;


import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleId implements Serializable {
  private int userId;
  private int courseId;
}
