I will implement the **Comment Notifications** feature by adding a new Notification Domain and integrating it with the existing Comment system using an Event-Driven Architecture.

### 1. Domain Layer (`backend/domain`)
*   **Model**: Create `Notification` class and `NotificationType` enum (`COMMENT_ON_POST`, `REPLY_TO_COMMENT`).
*   **Repository**: Create `NotificationRepository` interface.
*   **Event**: Create `CommentCreatedEvent` record to carry event data (commentId, postId, authorId, content, etc.).

### 2. Infrastructure Layer (`backend/infrastructure`)
*   **Database**: Add `notifications` table to `schema.sql`.
*   **Entity**: Create `NotificationEntity` for persistence.
*   **Mapper**: Create `NotificationMapper` and `NotificationMapper.xml` (MyBatis) for database operations.
*   **Repository Impl**: Implement `NotificationRepositoryImpl`.

### 3. Application Layer (`backend/application`)
*   **Service**: Create `NotificationAppService` to handle notification retrieval and "mark as read" logic.
*   **Event Listener**: Create `NotificationEventListener` to listen for `CommentCreatedEvent`.
    *   **Logic**:
        *   If it's a root comment, notify the **Post Author**.
        *   If it's a reply, notify the **Parent Comment Author**.
        *   *Skip notification if the actor is the same as the recipient.*
*   **Integration**: Update `CommentAppService` to publish `CommentCreatedEvent` after a comment is successfully created.

### 4. Interface Layer (`backend/interface`)
*   **Controller**: Create `NotificationController` with endpoints:
    *   `GET /api/notifications` (List current user's notifications)
    *   `PUT /api/notifications/{id}/read` (Mark specific notification as read)
    *   `GET /api/notifications/unread-count` (Get count of unread notifications)

### 5. Verification
*   I will verify the changes by simulating a comment creation and checking if a notification is persisted in the database for the correct recipient.
