package com.personal.portfolio.page;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * 分页查询结果对象 - 领域层专用
 * @param <T> 数据类型
 */
@Setter
@Getter
public class PageResult<T> {
    private List<T> records;
    private Long total;
    private Integer page;
    private Integer size;
    private Integer pages;
    
    public PageResult() {
    }
    
    public PageResult(List<T> records, Long total, Integer page, Integer size) {
        this.records = records;
        this.total = total;
        this.page = page;
        this.size = size;
        this.pages = size > 0 ? (int) Math.ceil((double) total / size) : 0;
    }
    
    public static <T> PageResult<T> of(List<T> records, Long total, Integer page, Integer size) {
        return new PageResult<>(records, total, page, size);
    }

    public boolean hasNext() {
        return page < pages;
    }
    
    public boolean hasPrevious() {
        return page > 1;
    }
}
