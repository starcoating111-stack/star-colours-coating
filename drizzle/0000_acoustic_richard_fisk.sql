CREATE TABLE `admin` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`password_hash` text NOT NULL,
	`password_changed_at` integer DEFAULT (strftime('%s', 'now') * 1000),
	`updated_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
CREATE TABLE `faq` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image_url` text NOT NULL,
	`category` text,
	`caption` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`subject` text,
	`message` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
CREATE TABLE `project_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`image_url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`location` text NOT NULL,
	`completion_date` text NOT NULL,
	`cover_image_url` text NOT NULL,
	`client_name` text,
	`area` text,
	`budget` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
	`updated_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`ip_address` text NOT NULL,
	`attempted_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `key_attempt_idx` ON `rate_limits` (`key`,`attempted_at`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text NOT NULL,
	`icon` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
	`updated_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`company_name` text DEFAULT 'CodeNXT Lab Client' NOT NULL,
	`tagline` text,
	`logo_url` text,
	`phone` text,
	`email` text,
	`address` text,
	`working_hours` text,
	`google_maps_link` text,
	`whatsapp_number` text,
	`social_links` text,
	`updated_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`designation` text,
	`review` text NOT NULL,
	`rating` integer NOT NULL,
	`photo_url` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
