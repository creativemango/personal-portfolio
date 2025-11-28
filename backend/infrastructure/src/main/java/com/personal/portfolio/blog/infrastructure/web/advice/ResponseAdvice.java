package com.personal.portfolio.blog.infrastructure.web.advice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.personal.portfolio.blog.infrastructure.common.response.ResultData;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
public class ResponseAdvice implements ResponseBodyAdvice<Object> {
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {
        return true;
    }

    @SneakyThrows
    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        // 如果已经是ResultData，则不进行封装
        if (o instanceof ResultData) {
            return o;
        }
        
        // 如果返回类型是String，需要特殊处理
        if (o instanceof String) {
            return objectMapper.writeValueAsString(ResultData.success(o));
        }
        
        // 对于其他类型，统一封装为ResultData
        return ResultData.success(o);
    }


}
