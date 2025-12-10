package com.personal.portfolio.blog.domain.model.valueobject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * 内容值对象
 * 封装博客内容的业务规则和验证逻辑
 */
@Getter
@EqualsAndHashCode
public class Content implements ValueObject {

    /**
     * -- GETTER --
     *  获取内容值
     */
    private final String value;

    /**
     * 私有构造函数，通过工厂方法创建
     */
    private Content(String value) {
        this.value = value.trim();
    }
    
    /**
     * 工厂方法：从字符串创建Content
     */
    public static Content of(String value) {
        return new Content(value);
    }

    /**
     * 转换为字符串
     */
    @Override
    public String toString() {
        return value;
    }
    
    /**
     * 获取摘要（前100个字符）
     */
    public String getSummary() {
        if (value.length() <= 100) {
            return value;
        }
        return value.substring(0, 100) + "...";
    }
    
    /**
     * 获取纯文本内容（移除HTML标签）
     */
    public String getPlainText() {
        return value.replaceAll("<[^>]*>", "");
    }
    
    /**
     * 判断内容是否包含特定关键词
     */
    public boolean containsKeyword(String keyword) {
        return value.toLowerCase().contains(keyword.toLowerCase());
    }
    
    /**
     * 获取字数统计
     */
    public int getWordCount() {
        if (value.isEmpty()) {
            return 0;
        }
        return value.trim().split("\\s+").length;
    }
}
