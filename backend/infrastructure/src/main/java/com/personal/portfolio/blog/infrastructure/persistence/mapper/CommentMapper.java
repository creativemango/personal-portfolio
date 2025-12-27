package com.personal.portfolio.blog.infrastructure.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.portfolio.blog.infrastructure.persistence.entity.CommentEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommentMapper extends BaseMapper<CommentEntity> {
}

