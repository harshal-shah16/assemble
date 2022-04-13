package com.assemble.backend.util;

import com.assemble.backend.model.entities.Likes;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import lombok.SneakyThrows;

@Converter(autoApply = true)
public class LikeConverter implements AttributeConverter<Likes, String> {

  @SneakyThrows
  @Override
  public String convertToDatabaseColumn(Likes entityValue) {
    if( entityValue == null )
      return null;

    ObjectMapper mapper = new ObjectMapper();

    return mapper.writeValueAsString(entityValue);
  }

  @SneakyThrows
  @Override
  public Likes convertToEntityAttribute(String databaseValue) {
    if( databaseValue == null )
      return new Likes();

    ObjectMapper mapper = new ObjectMapper();

    return mapper.readValue(databaseValue, Likes.class);

  }
}
