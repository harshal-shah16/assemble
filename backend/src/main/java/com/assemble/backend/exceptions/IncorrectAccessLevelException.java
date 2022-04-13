package com.assemble.backend.exceptions;

import java.util.Arrays;

public class IncorrectAccessLevelException extends RuntimeException {
  public IncorrectAccessLevelException(Object... args) {
    super("Access denied. Arguments were: " + Arrays.toString(args));
  }
}
