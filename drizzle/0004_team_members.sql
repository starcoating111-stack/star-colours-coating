CREATE TABLE `team_members` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL,
  `designation` text NOT NULL,
  `bio` text,
  `photo_url` text,
  `email` text,
  `linkedin_url` text,
  `sort_order` integer NOT NULL DEFAULT 0,
  `is_active` integer NOT NULL DEFAULT 1,
  `created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
  `updated_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
