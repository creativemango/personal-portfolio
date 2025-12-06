package com.personal.portfolio.blog.domain.common;

import lombok.Data;

/**
 * API响应通用类 - 领域层定义
 * 用于统一API响应格式，遵循依赖倒置原则
 */
@Data
public class ApiResponse<T> {
    /** 结果状态码 */
    private int status;
    /** 结果消息 */
    private String message;
    /** 响应数据 */
    private T data;
    /** 时间戳 */
    private long timestamp;
    
    public ApiResponse() {
        this.timestamp = System.currentTimeMillis();
    }
    
    public ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }
    
    /**
     * 成功响应
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(ResponseCode.SUCCESS.getCode(), 
                                ResponseCode.SUCCESS.getMessage(), 
                                data);
    }
    
    /**
     * 失败响应
     */
    public static <T> ApiResponse<T> fail(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }
    
    /**
     * 失败响应（使用响应码枚举）
     */
    public static <T> ApiResponse<T> fail(ResponseCode code) {
        return new ApiResponse<>(code.getCode(), code.getMessage(), null);
    }
    
    /**
     * 失败响应（使用响应码枚举和自定义消息）
     */
    public static <T> ApiResponse<T> fail(ResponseCode code, String customMessage) {
        return new ApiResponse<>(code.getCode(), customMessage, null);
    }
}
