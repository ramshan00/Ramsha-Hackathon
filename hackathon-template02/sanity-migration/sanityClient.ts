// sanityClient.ts
import { createClient } from '@sanity/client';
import dotenv from "dotenv"

dotenv.config()
export const client = createClient({
  projectId: 'rjlk3aki', // Replace with your project ID
  dataset: 'production',        // Or your dataset name
  apiVersion: '2025-01-13',     // Today's date or latest API version
  useCdn: false,                // Disable CDN for real-time updates
  token:'skJSE31NmgagKxvzc7OOhlkYyUoZYyyKXRa8I80bGxBkBmSKXlh3rxMWJg4yHAj0TQJKtMxUlOe92GIpCfA1aQLkXEjBmKWMo0FjkrIb7qOA4ye4CY67mWIVZI9DtZ9LtVXr9lplYWmJqCitbqa0YoAHEFytGAoOMXslbuI9at5NPXmd3jbn',
});