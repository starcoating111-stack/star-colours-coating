import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { hashPassword, generateSalt, benchmarkScrypt } from '../src/lib/server/auth/auth';
import { randomBytes } from 'node:crypto';

async function main() {
	const args = process.argv.slice(2);
	const isRemote = args.includes('--remote');
	const target = isRemote ? 'remote' : 'local';

	console.log('--- Starting Database Seed & Benchmark ---');

	// 1. Benchmark scrypt hashing
	console.log('Benchmarking scrypt password hashing on current runtime environment...');
	const duration = await benchmarkScrypt();
	console.log(`scrypt (N=16384, r=8, p=1) benchmark complete. Time taken: ${duration}ms`);

	if (duration > 150) {
		console.log(
			'WARNING: Hashing time is relatively high (>150ms). This is fine on Workers due to native crypto thread offloading, but keep an eye on JS execution limits.'
		);
	} else {
		console.log('scrypt hashing performance is within excellent limits.');
	}

	// 2. Resolve password
	let password = process.env.ADMIN_PASSWORD;
	let wasGenerated = false;

	if (!password) {
		password = randomBytes(8).toString('hex'); // 16 characters hex
		wasGenerated = true;
	}

	if (password.length < 12) {
		console.warn(
			'WARNING: Initializing with a password shorter than 12 characters is not recommended.'
		);
	}

	// 3. Generate salt and hash admin credentials
	const salt = generateSalt();
	const hash = await hashPassword(password, salt);
	const passwordHash = `${salt}:${hash}`;
	const nowMs = Date.now();

	// 4. Generate SQL seed statements
	const sql = `
-- Seed file generated on demand
INSERT OR REPLACE INTO admin (id, password_hash, password_changed_at, updated_at) 
VALUES (1, '${passwordHash}', ${nowMs}, ${nowMs});

INSERT OR REPLACE INTO settings (id, company_name, tagline, logo_url, phone, email, address, working_hours) 
VALUES (1, 'Star Colours Coating', 'Crafting Modern Digital Experiences', 'placeholder-logo.png', '+1 (555) 019-9000', 'hello@clientcompany.com', '123 Agency Way, Suite 400', 'Mon-Fri 9am-6pm');

INSERT OR REPLACE INTO faq (id, question, answer, sort_order) VALUES 
(1, 'What is your typical project timeline?', 'Most projects range from 4 to 8 weeks depending on the complexity of requirements and design iterations.', 10),
(2, 'Do you provide post-launch support?', 'Yes, we offer ongoing maintenance, optimization, and support packages tailored to your business needs.', 20);

INSERT OR REPLACE INTO services (id, title, slug, description, image_url, icon, sort_order) VALUES
(1, 'Web Design & Development', 'web-design-dev', 'Bespoke high-performance landing pages and portals built with modern frameworks.', 'service-web.webp', 'Globe', 10),
(2, 'Brand Strategy', 'brand-strategy', 'Establish your identity with professional logos, typography, and cohesive guidelines.', 'service-brand.webp', 'Layers', 20);

INSERT OR REPLACE INTO testimonials (id, name, designation, review, rating, is_featured, sort_order) VALUES
(1, 'Jane Doe', 'CEO, Acme Corp', 'The team delivered our website ahead of schedule and the performance has doubled our inbound conversions!', 5, 1, 10),
(2, 'John Smith', 'Founder, StartupX', 'Extremely professional and easy to work with. Highly recommend for any custom development work.', 5, 1, 20);
`;

	const seedSqlPath = join(process.cwd(), 'drizzle', 'seed.sql');

	try {
		if (!existsSync(join(process.cwd(), 'drizzle'))) {
			mkdirSync(join(process.cwd(), 'drizzle'));
		}

		writeFileSync(seedSqlPath, sql, 'utf-8');
		console.log('Generated temporary seed file: drizzle/seed.sql');

		// 5. Run seed SQL via wrangler D1 execute
		const wranglerCmd = `npx wrangler d1 execute DB ${isRemote ? '--remote' : '--local'} --file=drizzle/seed.sql`;
		console.log(`Executing D1 seed query against ${target} database...`);

		execSync(wranglerCmd, { stdio: 'inherit' });
		console.log('Database successfully seeded!');

		if (wasGenerated) {
			console.log('\n==================================================');
			console.log('   INITIAL ADMIN PASSWORD GENERATED SUCCESSFULLY  ');
			console.log(`   Password: ${password}`);
			console.log('   Please copy and save this password now!        ');
			console.log('==================================================\n');
		} else {
			console.log('\nAdmin initialized with password supplied via ADMIN_PASSWORD.\n');
		}
	} catch (err: any) {
		console.error('Error during database seed execution:', err.message);
		process.exit(1);
	} finally {
		try {
			if (existsSync(seedSqlPath)) {
				unlinkSync(seedSqlPath);
				console.log('Cleaned up temporary seed file.');
			}
		} catch (cleanErr: any) {
			console.warn('Failed to clean up drizzle/seed.sql:', cleanErr.message);
		}
	}
}

main();
