// sanityClient.ts
import { createClient } from '@sanity/client';
import dotenv from "dotenv"

dotenv.config()
export const client = createClient({
  projectId: 'rjlk3aki', // Replace with your project ID
  dataset: 'production',        // Or your dataset name
  apiVersion: '2025-01-13',     // Today's date or latest API version
  useCdn: false,                // Disable CDN for real-time updates
  token:'skH7s4DSF59Xot3SSDRNON9BHGBa0ka2ks2VzsNMZAsOs058Q27gmHvc2NQKFI6mRuvoKi4t9c1ldMPzDxjdH2wAIJhHqzQ72XmZE5crZYfkpI6Ue96O3ETPIj1RRuxCDqjyQuHidejB8HBZC1lI9HsV5OJa1cKt6M4e3vcH8QTHJGsP6Gw8',
});