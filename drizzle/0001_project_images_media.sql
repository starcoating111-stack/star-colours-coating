-- Extend project_images to support mixed image/video media.
-- SQLite cannot ALTER COLUMN to change NOT NULL, so we recreate the table.
PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `project_images_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`media_type` text NOT NULL DEFAULT 'image',
	`image_url` text,
	`video_url` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `project_images_new` (`id`, `project_id`, `media_type`, `image_url`, `video_url`, `sort_order`)
SELECT `id`, `project_id`, 'image', `image_url`, NULL, `sort_order` FROM `project_images`;
--> statement-breakpoint
DROP TABLE `project_images`;
--> statement-breakpoint
ALTER TABLE `project_images_new` RENAME TO `project_images`;
--> statement-breakpoint
PRAGMA foreign_keys=ON;
