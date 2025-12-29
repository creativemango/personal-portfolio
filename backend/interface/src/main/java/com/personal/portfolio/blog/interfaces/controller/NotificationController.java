package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.dto.NotificationDTO;
import com.personal.portfolio.blog.application.service.NotificationAppService;
import com.personal.portfolio.blog.interfaces.dto.response.NotificationResponse;
import com.personal.portfolio.converter.PageResultConverter;
import com.personal.portfolio.page.PageResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationAppService notificationService;
    private static final PageResultConverter pageResultConverter = new PageResultConverter();

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public PageResult<NotificationResponse> listNotifications(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size) {
        PageResult<NotificationDTO> result = notificationService.listMyNotifications(page, size);
        return pageResultConverter.convert(result, NotificationResponse.class);
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("isAuthenticated()")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    @PutMapping("/read-all")
    @PreAuthorize("isAuthenticated()")
    public void markAllAsRead() {
        notificationService.markAllAsRead();
    }

    @GetMapping("/unread-count")
    @PreAuthorize("isAuthenticated()")
    public Long getUnreadCount() {
        return notificationService.getUnreadCount();
    }
}
