package com.personal.portfolio.blog.domain.common;

/**
 * 响应码枚举 - 领域层定义
 * 定义通用的API响应状态码
 */
public enum ResponseCode {
    /** 操作成功 */
    SUCCESS(100, "操作成功"),
    /** 操作失败 */
    FAILURE(999, "操作失败"),
    /** 系统异常 */
    SYSTEM_ERROR(500, "系统异常，请稍后重试"),
    /** 参数错误 */
    PARAM_ERROR(400, "参数错误"),
    /** 未授权 */
    UNAUTHORIZED(401, "未授权访问"),
    /** 禁止访问 */
    FORBIDDEN(403, "禁止访问"),
    /** 资源未找到 */
    NOT_FOUND(404, "资源未找到"),
    /** 用户名或密码错误 */
    USERNAME_OR_PASSWORD_ERROR(1002, "用户名或密码错误"),
    /** 无效令牌 */
    INVALID_TOKEN(2001, "访问令牌不合法"),
    /** 访问被拒绝 */
    ACCESS_DENIED(2003, "没有权限访问该资源");
    
    /** 状态码 */
    private final int code;
    /** 描述信息 */
    private final String message;
    
    ResponseCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
    
    public int getCode() {
        return code;
    }
    
    public String getMessage() {
        return message;
    }
    
    /**
     * 根据code查找ResponseCode
     */
    public static ResponseCode fromCode(int code) {
        for (ResponseCode responseCode : values()) {
            if (responseCode.getCode() == code) {
                return responseCode;
            }
        }
        return FAILURE;
    }
}
