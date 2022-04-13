package com.assemble.backend.exceptions;

import java.util.Arrays;

public class RecordDoesNotExistException extends RuntimeException {

  public RecordDoesNotExistException(Object... args) {
    super("Record does not exist. Arguments were: " + Arrays.toString(args));
  }
}
