package com.assemble.backend.model.entities;

import java.io.Serializable;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Likes implements Serializable {
  private static final long serialVersionUID=1L;

  public ArrayList<Integer> userIds = new ArrayList<>();

}
