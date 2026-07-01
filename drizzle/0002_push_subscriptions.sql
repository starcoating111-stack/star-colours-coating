--> statement-breakpoint
CREATE TABLE `push_subscriptions` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `endpoint` text NOT NULL,
  `keys` text NOT NULL,
  `created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
  CONSTRAINT `push_subscriptions_endpoint_unique` UNIQUE(`endpoint`)
);
