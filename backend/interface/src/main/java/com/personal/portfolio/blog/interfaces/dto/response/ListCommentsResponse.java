package com.personal.portfolio.blog.interfaces.dto.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListCommentsResponse {
    private List<CommentResponse> items;
    private Long total;
    private Integer page;
    private Integer size;
    private Integer pages;
}

