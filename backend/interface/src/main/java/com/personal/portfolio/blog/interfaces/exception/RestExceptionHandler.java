package com.personal.portfolio.blog.interfaces.exception;

import com.personal.portfolio.blog.domain.common.ApiResponse;
import com.personal.portfolio.blog.domain.common.ResponseCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {
    /**
     * 默认全局异常处理。
     * @param e the e
     * @return ApiResponse
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<String> exception(Exception e) {
        log.error("全局异常信息 ex={}", e.getMessage(), e);
        return ApiResponse.fail(ResponseCode.SYSTEM_ERROR, e.getMessage());
    }

    /**
     * 认证异常处理
     * @param e the e
     * @return ApiResponse
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse<String> handleAuthenticationException(AuthenticationException e) {
        log.warn("认证异常: {}", e.getMessage());
        return ApiResponse.fail(ResponseCode.USERNAME_OR_PASSWORD_ERROR, e.getMessage());
    }

    /**
     * 参数异常处理
     * @param e the e
     * @return ApiResponse
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<String> handleIllegalArgumentException(IllegalArgumentException e) {
        log.warn("参数异常: {}", e.getMessage());
        return ApiResponse.fail(ResponseCode.PARAM_ERROR, e.getMessage());
    }

}
