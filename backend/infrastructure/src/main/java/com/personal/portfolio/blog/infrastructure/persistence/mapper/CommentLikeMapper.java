package com.personal.portfolio.blog.infrastructure.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.portfolio.blog.infrastructure.persistence.entity.CommentLikeEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommentLikeMapper extends BaseMapper<CommentLikeEntity> {
}
