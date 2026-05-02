CREATE TABLE `partner_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contactName` varchar(255) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(64),
	`organizationName` varchar(255) NOT NULL,
	`organizationType` enum('coach','brand','organization') NOT NULL,
	`description` text,
	`websiteUrl` varchar(512),
	`status` enum('pending','reviewing','approved','rejected') NOT NULL DEFAULT 'pending',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partner_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('coach','brand','organization') NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameZh` varchar(255),
	`nameFr` varchar(255),
	`nameJa` varchar(255),
	`descriptionEn` text,
	`descriptionZh` text,
	`descriptionFr` text,
	`descriptionJa` text,
	`logoUrl` varchar(512),
	`websiteUrl` varchar(512),
	`contactEmail` varchar(320),
	`isVisible` enum('visible','hidden') NOT NULL DEFAULT 'visible',
	`displayOrder` int NOT NULL DEFAULT 0,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
