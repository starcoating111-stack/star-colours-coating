import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// settings (single row, company-level info, always id = 1)
export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey().default(1),
  companyName: text('company_name').notNull().default('CodeNXT Lab Client'),
  tagline: text('tagline'),
  logoUrl: text('logo_url'),
  phone: text('phone'),
  email: text('email'),
  address: text('address'),
  workingHours: text('working_hours'), // free-form, e.g. "Mon-Sat 9am-6pm"
  googleMapsLink: text('google_maps_link'),
  whatsappNumber: text('whatsapp_number'),
  whatsappDefaultMessage: text('whatsapp_default_message'),
  socialLinks: text('social_links', { mode: 'json' }).$type<{
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  }>(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(strftime('%s', 'now') * 1000)`)
    .$onUpdate(() => new Date())
});

// services
export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(), // R2 key
  icon: text('icon'), // Lucide icon name
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`)
});

// projects
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  location: text('location').notNull(),
  completionDate: text('completion_date').notNull(), // free form e.g. "2026-06"
  coverImageUrl: text('cover_image_url').notNull(), // R2 key
  clientName: text('client_name'),
  area: text('area'),
  budget: text('budget'),
  isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`)
});

// project_images (mixed image + video media items per project)
export const projectImages = sqliteTable('project_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  mediaType: text('media_type', { enum: ['image', 'video'] }).notNull().default('image'),
  imageUrl: text('image_url'),   // R2 key; null for video rows
  videoUrl: text('video_url'),   // raw validated URL; null for image rows
  sortOrder: integer('sort_order').notNull().default(0),
});

// gallery (standalone gallery)
export const gallery = sqliteTable('gallery', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  imageUrl: text('image_url').notNull(), // R2 key
  category: text('category'),
  caption: text('caption'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`)
});

// testimonials
export const testimonials = sqliteTable('testimonials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  designation: text('designation'),
  review: text('review').notNull(),
  rating: integer('rating').notNull(), // 1-5
  photoUrl: text('photo_url'), // R2 key
  isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`)
});

// faq
export const faq = sqliteTable('faq', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  sortOrder: integer('sort_order').notNull().default(0)
});

// messages (contact form submissions)
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject'),
  message: text('message').notNull(),
  status: text('status', { enum: ['new', 'read', 'archived'] }).notNull().default('new'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`)
});

// admin
export const admin = sqliteTable('admin', {
  id: integer('id').primaryKey().default(1),
  passwordHash: text('password_hash').notNull(), // salt:hash
  passwordChangedAt: integer('password_changed_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`)
});

// push_subscriptions (admin browser push, one row per subscribed device)
export const pushSubscriptions = sqliteTable('push_subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  endpoint: text('endpoint').notNull().unique(),
  keys: text('keys').notNull(), // JSON: { p256dh: string, auth: string }
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(strftime('%s', 'now') * 1000)`)
});

// rate_limits
export const rateLimits = sqliteTable('rate_limits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull(), // e.g., 'login:ip' or 'contact:ip'
  ipAddress: text('ip_address').notNull(),
  attemptedAt: integer('attempted_at', { mode: 'timestamp' }).notNull()
}, (table) => {
  return {
    keyAttemptIndex: index('key_attempt_idx').on(table.key, table.attemptedAt)
  };
});
