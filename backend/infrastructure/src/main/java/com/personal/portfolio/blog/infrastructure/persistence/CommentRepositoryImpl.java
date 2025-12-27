package com.personal.portfolio.blog.infrastructure.persistence;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personal.portfolio.blog.domain.model.Comment;
import com.personal.portfolio.blog.domain.repository.CommentRepository;
import com.personal.portfolio.blog.infrastructure.persistence.entity.CommentEntity;
import com.personal.portfolio.blog.infrastructure.persistence.mapper.CommentMapper;
import com.personal.portfolio.converter.PageResultConverter;
import com.personal.portfolio.page.PageResult;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import io.github.linpeilie.Converter;

@Repository
public class CommentRepositoryImpl implements CommentRepository {
    private final CommentMapper commentMapper;
    private static final Converter converter = new Converter();
    private static final PageResultConverter pageResultConverter = new PageResultConverter();

    public CommentRepositoryImpl(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    @Override
    public PageResult<Comment> listByPostId(Long postId, Integer page, Integer size) {
        Page<CommentEntity> pageRequest = new Page<>(page, size);
        LambdaQueryWrapper<CommentEntity> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(CommentEntity::getPostId, postId)
               .eq(CommentEntity::getIsApproved, true)
               .orderByAsc(CommentEntity::getCreatedAt);
        IPage<CommentEntity> iPage = commentMapper.selectPage(pageRequest, wrapper);
        return pageResultConverter.convertFromIPage(iPage, Comment.class);
    }

    @Override
    public Comment save(Comment comment) {
        CommentEntity entity = converter.convert(comment, CommentEntity.class);
        if (entity.getId() == null) {
            if (entity.getIsApproved() == null) {
                entity.setIsApproved(true);
            }
            commentMapper.insert(entity);
            comment.setId(entity.getId());
        } else {
            commentMapper.updateById(entity);
        }
        return comment;
    }

    @Override
    public Optional<Comment> findById(Long id) {
        CommentEntity entity = commentMapper.selectById(id);
        if (entity == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(converter.convert(entity, Comment.class));
    }

    @Override
    public boolean deleteById(Long id) {
        return commentMapper.deleteById(id) > 0;
    }

    @Override
    public Long countByPostId(Long postId) {
        LambdaQueryWrapper<CommentEntity> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(CommentEntity::getPostId, postId)
               .eq(CommentEntity::getIsApproved, true);
        return commentMapper.selectCount(wrapper);
    }
}
