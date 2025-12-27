## Requirements Mapping

* Visibility: All users (logged-in or not) can view comments on published posts.

* Commenting: Only logged-in users can add comments on published posts.

* Deletion: Admins can delete any comment; non-admin users can delete only their own comments.

## Backend Endpoints

* GET `/api/blog/posts/{postId}/comments` (public)

  * Returns paginated list: `{ id, postId, userId, authorName, content, createdAt }`.

* POST `/api/blog/posts/{postId}/comments` (authenticated)

  * Body: `{ content }`; server derives `userId`, `authorName` from current user.

  * Validates target post exists and `isPublished == true`.

* DELETE `/api/comments/{id}` (authenticated)

  * Allowed if current user `ROLE_ADMIN` or `comment.userId == currentUserId`.

## Backend Implementation

* Domain model: `Comment` (id, postId, userId, authorName, content, createdAt, parentId?)

* Domain repository: `CommentRepository` with `listByPostId(postId, page)`, `create(comment)`, `deleteById(id)`.

* Persistence (MyBatis-Plus):

  * `CommentEntity` mapped to `comments` table (`@TableName("comments")`, fields per `schema.sql`).

  * `CommentMapper` extends `BaseMapper<CommentEntity>`.

  * `CommentRepositoryImpl` converts between domain and entity.

* Application/service layer:

  * `CommentService` enforcing business rules:

    * On create: load `BlogPost` by `postId`; forbid if not published; set `userId/authorName`; persist; update `BlogPost.commentCount`.

    * On delete: load comment; if admin → allow; else require `comment.userId == currentUserId`; delete; decrement `commentCount`.

* Controller: `CommentController`

  * Wires endpoints, validates input size (e.g., 1–2000 chars), returns DTOs.

* Security configuration:

  * Permit `GET /api/blog/posts/*/comments`.

  * Require auth for `POST /api/blog/posts/*/comments` and `DELETE /api/comments/*`.

  * Method-level guard in service/controller for owner-or-admin delete.

## Data Contracts (DTOs)

* `CommentResponse`: `{ id, postId, userId, authorName, content, createdAt }`.

* `CreateCommentRequest`: `{ content }`.

* `ListCommentsResponse`: `{ items: CommentResponse[], page, pageSize, total }`.

## Frontend Integration

* Services (`frontend/src/services/blogService.js` or new `commentService.js`):

  * `getComments(postId)` → GET.

  * `createComment(postId, content)` → POST (uses `Authorization: Bearer <token>` automatically).

  * `deleteComment(commentId)` → DELETE.

* UI components:

  * `CommentList`: fetch and render comments under the post content; visible to all.

  * `CommentForm`: render only if `user` exists and `post.isPublished === true`.

  * Delete button per comment:

    * Visible if `user.role === 'ADMIN'` or `user.id === comment.userId`.

* Page integration: mount `CommentList` and conditional `CommentForm` on `BlogPost.jsx`.

## Validation & Constraints

* Content length: 1–2000 chars, trim whitespace; reject empty.

* Rate limiting (optional): basic per-user cooldown (e.g., 5s) to reduce spam.

* XSS safety: store raw text; render escaped on frontend; no HTML allowed in comments.

## Tests

* Backend unit/integration:

  * Create comment succeeds only for authenticated users on published posts; fails for guests/unpublished.

  * Delete: admin can delete any; visitor can delete own; visitor cannot delete others.

  * List comments public endpoint returns results.

* Frontend:

  * `BlogPost` page shows comments for guests; hides form when logged out; shows form when logged in and published.

  * Delete button visibility matches role/ownership; actions update UI state.

## Rollout Notes

* No schema changes if `comments` already exists; align entity fields to `schema.sql`.

* Ensure CORS already permits frontend origin.

* Document API in README or interface module for future maintenance.

