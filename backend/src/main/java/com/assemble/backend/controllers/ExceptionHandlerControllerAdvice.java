package com.assemble.backend.controllers;

import com.assemble.backend.exceptions.IncorrectAccessLevelException;
import com.assemble.backend.exceptions.RecordDoesNotExistException;
import com.assemble.backend.exceptions.UserUnauthorizedToCourseException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice {

  /**
   * For @Valid annotations throwing exceptions.
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  public @ResponseBody
  ExceptionResponse handleResourceNotFound(
          MethodArgumentNotValidException exception,
          HttpServletRequest request) {
    ExceptionResponse error = new ExceptionResponse();
    error.setRequestedURI(request.getRequestURI());
    final Optional<ObjectError> firstError =
            exception.getBindingResult().getAllErrors().stream().findFirst();
    firstError.ifPresent(objectError -> error.setErrorMessage(objectError.getDefaultMessage()));
    return error;
  }

  /**
   * The provided data had a data source violation.
   */
  @ExceptionHandler({DataIntegrityViolationException.class})
  @ResponseStatus(value = HttpStatus.CONFLICT)
  public @ResponseBody
  ExceptionResponse handleDataIntegrity(
          DataIntegrityViolationException exception,
          HttpServletRequest request) {
    return new ExceptionResponse(
            exception.getCause().getCause().getMessage(), request.getRequestURI());
  }

  /**
   * The user is not authorized to the requested course.
   */
  @ExceptionHandler({UserUnauthorizedToCourseException.class})
  @ResponseStatus(value = HttpStatus.CONFLICT)
  public @ResponseBody
  ExceptionResponse handleCourseAuthorization(
          UserUnauthorizedToCourseException exception,
          HttpServletRequest request) {
    return new ExceptionResponse(exception.getMessage(), request.getRequestURI());
  }

  /**
   * The user is does not have the correct access level to CRUD the record.
   */
  @ExceptionHandler({IncorrectAccessLevelException.class})
  @ResponseStatus(value = HttpStatus.CONFLICT)
  public @ResponseBody
  ExceptionResponse handleIncorrectAccessLevel(
          IncorrectAccessLevelException exception,
          HttpServletRequest request) {
    return new ExceptionResponse(exception.getMessage(), request.getRequestURI());
  }

  /**
   * An update on a record that does not exist in the data source.
   */
  @ExceptionHandler({RecordDoesNotExistException.class})
  @ResponseStatus(value = HttpStatus.CONFLICT)
  public @ResponseBody
  ExceptionResponse handleRecordDoesNotExist(
          RecordDoesNotExistException exception,
          HttpServletRequest request) {
    return new ExceptionResponse(exception.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
  public @ResponseBody
  ExceptionResponse handleException(final Exception exception,
                                    final HttpServletRequest request) {

    return new ExceptionResponse(exception.getMessage(), request.getRequestURI());
  }
}
