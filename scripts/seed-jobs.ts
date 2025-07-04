import { config } from 'dotenv';
import { resolve } from 'path';
import { seedJobs } from '../lib/seed-jobs';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

async function main() {
  console.log('🌱 Seeding jobs...');
  await seedJobs();
  console.log('✅ Jobs seeding completed!');
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Error seeding jobs:', error);
  process.exit(1);
}); 