package com.personal.portfolio.blog.infrastructure.persistence;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personal.portfolio.blog.domain.model.Notification;
import com.personal.portfolio.blog.domain.repository.NotificationRepository;
import com.personal.portfolio.blog.infrastructure.persistence.entity.NotificationEntity;
import com.personal.portfolio.blog.infrastructure.persistence.mapper.NotificationMapper;
import com.personal.portfolio.converter.PageResultConverter;
import com.personal.portfolio.page.PageResult;
import com.personal.portfolio.util.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class NotificationRepositoryImpl implements NotificationRepository {
    private final NotificationMapper notificationMapper;
    private static final PageResultConverter pageResultConverter = new PageResultConverter();

    @Override
    public PageResult<Notification> listByRecipientId(Long recipientId, Integer page, Integer size) {
        Page<NotificationEntity> pageRequest = new Page<>(page, size);
        LambdaQueryWrapper<NotificationEntity> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(NotificationEntity::getRecipientId, recipientId)
               .orderByDesc(NotificationEntity::getCreatedAt);
        IPage<NotificationEntity> iPage = notificationMapper.selectPage(pageRequest, wrapper);
        return pageResultConverter.convertFromIPage(iPage, Notification.class);
    }

    @Override
    public Notification save(Notification notification) {
        NotificationEntity entity = BeanCopyUtils.toBean(notification, NotificationEntity.class);
        if (entity.getId() == null) {
            notificationMapper.insert(entity);
            notification.setId(entity.getId());
        } else {
            notificationMapper.updateById(entity);
        }
        return notification;
    }

    @Override
    public Optional<Notification> findById(Long id) {
        NotificationEntity entity = notificationMapper.selectById(id);
        if (entity == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(BeanCopyUtils.toBean(entity, Notification.class));
    }

    @Override
    public Long countUnreadByRecipientId(Long recipientId) {
        LambdaQueryWrapper<NotificationEntity> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(NotificationEntity::getRecipientId, recipientId)
               .eq(NotificationEntity::isRead, false);
        return notificationMapper.selectCount(wrapper);
    }

    @Override
    public void markAllAsRead(Long recipientId) {
        LambdaUpdateWrapper<NotificationEntity> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(NotificationEntity::getRecipientId, recipientId)
               .set(NotificationEntity::isRead, true);
        notificationMapper.update(null, wrapper);
    }
}
