import { seedDatabase } from '../utils/seedDatabase';

const runSeed = async () => {
  try {
    console.log('Starting database seeding...');
    await seedDatabase();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

runSeed(); 