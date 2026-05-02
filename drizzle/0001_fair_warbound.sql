CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`industry` varchar(128),
	`description` text,
	`descriptionI18n` json,
	`status` enum('pending','reviewing','approved','rejected') NOT NULL DEFAULT 'pending',
	`certificationLevel` enum('L1','L2','L3') NOT NULL DEFAULT 'L1',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`projectId` int,
	`certificateNumber` varchar(64) NOT NULL,
	`level` enum('L1','L2','L3') NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleI18n` json,
	`holderName` varchar(255) NOT NULL,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	`status` enum('active','expired','revoked') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_certificateNumber_unique` UNIQUE(`certificateNumber`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`applicationId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleI18n` json,
	`description` text,
	`descriptionI18n` json,
	`progress` int NOT NULL DEFAULT 0,
	`status` enum('active','completed','paused','cancelled') NOT NULL DEFAULT 'active',
	`milestones` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `translations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(128) NOT NULL,
	`category` varchar(64),
	`en` text,
	`zh` text,
	`fr` text,
	`ja` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `translations_id` PRIMARY KEY(`id`),
	CONSTRAINT `translations_key_unique` UNIQUE(`key`)
);
