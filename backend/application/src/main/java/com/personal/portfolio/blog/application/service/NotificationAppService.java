package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.application.dto.NotificationDTO;
import com.personal.portfolio.blog.domain.context.CurrentUserContext;
import com.personal.portfolio.blog.domain.model.Notification;
import com.personal.portfolio.blog.domain.model.User;
import com.personal.portfolio.blog.domain.repository.NotificationRepository;
import com.personal.portfolio.blog.domain.repository.UserRepository;
import com.personal.portfolio.converter.PageResultConverter;
import com.personal.portfolio.page.PageResult;
import io.github.linpeilie.Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationAppService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final CurrentUserContext currentUserContext;
    private static final Converter converter = new Converter();
    private static final PageResultConverter pageResultConverter = new PageResultConverter();

    public PageResult<NotificationDTO> listMyNotifications(Integer page, Integer size) {
        Long userId = currentUserContext.getCurrentUserId();
        PageResult<Notification> result = notificationRepository.listByRecipientId(userId, page, size);
        
        // Enhance with sender details
        Set<Long> senderIds = result.getRecords().stream()
                .map(Notification::getSenderId)
                .filter(id -> id != null)
                .collect(Collectors.toSet());
        
        Map<Long, User> senderMap = userRepository.findAllById(senderIds).stream()
                .collect(Collectors.toMap(User::getId, user -> user));

        PageResult<NotificationDTO> dtoResult = pageResultConverter.convert(result, NotificationDTO.class);
        dtoResult.getRecords().forEach(dto -> {
            if (dto.getSenderId() != null) {
                User sender = senderMap.get(dto.getSenderId());
                if (sender != null) {
                    dto.setSenderName(sender.getUsername());
                    dto.setSenderAvatar(sender.getAvatarUrl());
                }
            }
        });
        
        return dtoResult;
    }

    @Transactional
    public void markAsRead(Long notificationId) {
        Long userId = currentUserContext.getCurrentUserId();
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        
        if (!notification.getRecipientId().equals(userId)) {
            throw new IllegalStateException("You can only mark your own notifications as read");
        }
        
        notification.markAsRead();
        notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead() {
        Long userId = currentUserContext.getCurrentUserId();
        notificationRepository.markAllAsRead(userId);
    }

    public Long getUnreadCount() {
        Long userId = currentUserContext.getCurrentUserId();
        return notificationRepository.countUnreadByRecipientId(userId);
    }
}
