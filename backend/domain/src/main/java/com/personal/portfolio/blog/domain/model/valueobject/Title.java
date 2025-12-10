package com.personal.portfolio.blog.domain.model.valueobject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * 标题值对象
 * 封装标题的业务规则和验证逻辑
 */
@Getter
@EqualsAndHashCode
public class Title implements ValueObject {

    /**
     * -- GETTER --
     *  获取标题值
     */
    private final String value;

    /**
     * 私有构造函数，通过工厂方法创建
     */
    private Title(String value) {
        this.value = value.trim();
    }
    
    /**
     * 工厂方法：从字符串创建Title
     */
    public static Title of(String value) {
        return new Title(value);
    }

    /**
     * 转换为字符串
     */
    @Override
    public String toString() {
        return value;
    }
    
    /**
     * 判断标题是否包含特定关键词
     */
    public boolean containsKeyword(String keyword) {
        return value.toLowerCase().contains(keyword.toLowerCase());
    }
}
