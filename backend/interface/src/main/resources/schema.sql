-- 创建博客文章表
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    summary VARCHAR(500),
    cover_image VARCHAR(255),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    author_id BIGINT NOT NULL,
    category_id BIGINT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    github_id VARCHAR(100),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    display_name VARCHAR(100),
    avatar_url VARCHAR(255),
    bio VARCHAR(500),
    location VARCHAR(100),
    company VARCHAR(100),
    website VARCHAR(255),
    twitter_username VARCHAR(50),
    public_repos INT DEFAULT 0,
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    -- 密码字段，用于本地账户登录
    password VARCHAR(255),
    -- 标识是否为本地注册账户
    is_local_account BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- 创建分类表
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    color VARCHAR(20),
    sort_order INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT TRUE,
    post_count INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(1000) NOT NULL,
    author_name VARCHAR(50) NOT NULL,
    author_email VARCHAR(100),
    author_website VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    blog_post_id BIGINT NOT NULL,
    parent_id BIGINT,
    user_id BIGINT
);
