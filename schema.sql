-- Leave Management System — Database Schema Script


-- CREATE DATABASE & USER
CREATE DATABASE IF NOT EXISTS leave_management
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'leave_user'@'localhost' IDENTIFIED BY 'leave123';
GRANT ALL PRIVILEGES ON leave_management.* TO 'leave_user'@'localhost';
FLUSH PRIVILEGES;

USE leave_management;

SET FOREIGN_KEY_CHECKS = 0;

-- TABLE: role
-- Stores system roles (ROLE_ADMIN, ROLE_EMPLOYEE)
CREATE TABLE IF NOT EXISTS `role` (
    `id`        BIGINT          NOT NULL AUTO_INCREMENT,
    `version`   BIGINT          NOT NULL DEFAULT 0,
    `authority` VARCHAR(255)    NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_role_authority` (`authority`)
)

-- TABLE: user
-- Stores login credentials for all system users
-- Managed by Spring Security Core plugin
CREATE TABLE IF NOT EXISTS `user` (
    `id`               BIGINT       NOT NULL AUTO_INCREMENT,
    `version`          BIGINT       NOT NULL DEFAULT 0,
    `username`         VARCHAR(255) NOT NULL,
    `password`         VARCHAR(255) NOT NULL,
    `enabled`          BIT(1)       NOT NULL DEFAULT 1,
    `account_expired`  BIT(1)       NOT NULL DEFAULT 0,
    `account_locked`   BIT(1)       NOT NULL DEFAULT 0,
    `password_expired` BIT(1)       NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_user_username` (`username`)
)


-- TABLE: user_role
-- Join table linking users to their roles (many-to-many)
CREATE TABLE IF NOT EXISTS `user_role` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    CONSTRAINT `FK_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FK_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) 


-- TABLE: employees
-- Stores employee profile information
-- Each employee is linked to exactly one user account
CREATE TABLE IF NOT EXISTS `employees` (
    `id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `version`      BIGINT       NOT NULL DEFAULT 0,
    `employee_id`  VARCHAR(20)  NOT NULL,
    `full_name`    VARCHAR(100) NOT NULL,
    `email`        VARCHAR(150) NOT NULL,
    `department`   VARCHAR(100) NOT NULL,
    `joining_date` DATETIME     NOT NULL,
    `status`       VARCHAR(10)  NOT NULL DEFAULT 'Active',
    `user_id`      BIGINT       NOT NULL,
    `date_created` DATETIME     NOT NULL,
    `last_updated` DATETIME     NOT NULL,
    `created_by`   VARCHAR(100) DEFAULT NULL,
    `modified_by`  VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_employees_employee_id` (`employee_id`),
    UNIQUE KEY `UK_employees_email`       (`email`),
    UNIQUE KEY `UK_employees_user_id`     (`user_id`),
    CONSTRAINT `FK_employees_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) 


-- TABLE: leave_requests
-- Stores all leave applications submitted by employees
CREATE TABLE IF NOT EXISTS `leave_requests` (
    `id`             BIGINT        NOT NULL AUTO_INCREMENT,
    `version`        BIGINT        NOT NULL DEFAULT 0,
    `employee_id`    BIGINT        NOT NULL,
    `leave_type`     VARCHAR(20)   NOT NULL,
    `start_date`     DATETIME      NOT NULL,
    `end_date`       DATETIME      NOT NULL,
    `reason`         TEXT          NOT NULL,
    `status`         VARCHAR(20)   NOT NULL DEFAULT 'Pending',
    `remarks`        TEXT          DEFAULT NULL,
    `decision_date`  DATETIME      DEFAULT NULL,
    `decided_by_id`  BIGINT        DEFAULT NULL,
    `date_created`   DATETIME      NOT NULL,
    `last_updated`   DATETIME      NOT NULL,
    `created_by`     VARCHAR(100)  DEFAULT NULL,
    `modified_by`    VARCHAR(100)  DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_leave_requests_employee`   FOREIGN KEY (`employee_id`)   REFERENCES `employees` (`id`),
    CONSTRAINT `FK_leave_requests_decided_by` FOREIGN KEY (`decided_by_id`) REFERENCES `user` (`id`)
) 

-- TABLE: audit_logs
-- Tracks every create/update/delete action in the system
CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id`           BIGINT        NOT NULL AUTO_INCREMENT,
    `version`      BIGINT        NOT NULL DEFAULT 0,
    `entity_name`  VARCHAR(100)  NOT NULL,
    `entity_id`    BIGINT        DEFAULT NULL,
    `action`       VARCHAR(10)   NOT NULL,
    `performed_by` VARCHAR(100)  NOT NULL,
    `details`      TEXT          DEFAULT NULL,
    `date_created` DATETIME      NOT NULL,
    PRIMARY KEY (`id`)
) 

SET FOREIGN_KEY_CHECKS = 1;

-- VERIFY
SELECT 'Schema created successfully.' AS status;
SHOW TABLES;
