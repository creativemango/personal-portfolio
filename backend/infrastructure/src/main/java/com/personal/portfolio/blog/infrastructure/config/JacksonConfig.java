package com.personal.portfolio.blog.infrastructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Jackson配置类 - 处理日期时间格式
 */
@Configuration
public class JacksonConfig {

    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    
    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        
        // 创建JavaTimeModule
        JavaTimeModule module = new JavaTimeModule();
        
        // 配置LocalDateTime的序列化和反序列化
        LocalDateTimeSerializer serializer = new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
        LocalDateTimeDeserializer deserializer = new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
        
        module.addSerializer(LocalDateTime.class, serializer);
        module.addDeserializer(LocalDateTime.class, deserializer);
        
        objectMapper.registerModule(module);
        
        return objectMapper;
    }
}
