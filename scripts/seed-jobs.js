const { seedJobs } = require('../lib/seed-jobs.ts');

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