package com.personal.portfolio.blog.domain.model.valueobject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.regex.Pattern;

/**
 * Slug值对象
 * 用于URL的友好标识，包含验证和格式化逻辑
 */
@Getter
@EqualsAndHashCode
public class Slug implements ValueObject {
    
    private final String value;
    private static final int MAX_LENGTH = 200;
    private static final int MIN_LENGTH = 1;
    private static final Pattern VALID_SLUG_PATTERN = Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)*$");
    
    /**
     * 私有构造函数，通过工厂方法创建
     */
    private Slug(String value) {
        validate(value);
        this.value = normalize(value);
    }
    
    /**
     * 工厂方法：从字符串创建Slug
     */
    public static Slug of(String value) {
        return new Slug(value);
    }
    
    /**
     * 从标题生成Slug
     */
    public static Slug fromTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("标题不能为空");
        }
        
        // 转换为小写，替换非字母数字字符为连字符，移除多余的连字符
        String slug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();
        
        return new Slug(slug);
    }
    
    /**
     * 验证Slug
     */
    private void validate(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("Slug不能为空");
        }
        
        String normalized = normalize(value);
        if (normalized.length() < MIN_LENGTH) {
            throw new IllegalArgumentException("Slug长度不能小于" + MIN_LENGTH + "个字符");
        }
        
        if (normalized.length() > MAX_LENGTH) {
            throw new IllegalArgumentException("Slug长度不能超过" + MAX_LENGTH + "个字符");
        }
        
        if (!VALID_SLUG_PATTERN.matcher(normalized).matches()) {
            throw new IllegalArgumentException("Slug格式无效，只能包含小写字母、数字和连字符，且不能以连字符开头或结尾");
        }
    }
    
    /**
     * 规范化Slug
     */
    private String normalize(String value) {
        return value.toLowerCase().trim();
    }
    
    /**
     * 获取Slug值
     */
    public String getValue() {
        return value;
    }
    
    /**
     * 转换为字符串
     */
    @Override
    public String toString() {
        return value;
    }
    
    /**
     * 判断Slug是否有效
     */
    public boolean isValid() {
        try {
            validate(value);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
    
    /**
     * 获取Slug长度
     */
    public int length() {
        return value.length();
    }
    
    /**
     * 判断Slug是否与另一个Slug相似
     */
    public boolean isSimilarTo(Slug other) {
        if (other == null) return false;
        return this.value.equals(other.value) || 
               this.value.replace("-", "").equals(other.value.replace("-", ""));
    }
}
