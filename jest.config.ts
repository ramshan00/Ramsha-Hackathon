import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'jsdom', // Simulate browser environment for React components
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // File extensions Jest should process
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Optional: Include additional setup (create a jest.setup.ts if needed)
};

export default config;
