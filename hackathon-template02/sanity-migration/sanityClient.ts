// sanityClient.ts
import { createClient } from '@sanity/client';
import dotenv from "dotenv"
// import './importData'

dotenv.config()
export const client = createClient({
  projectId: 'l2ju9ltx', // Replace with your project ID
  dataset: 'production',        // Or your dataset name
  apiVersion: '2025-01-13',     // Today's date or latest API version
  useCdn: false,                // Disable CDN for real-time updates
  token: 'skmUIwfCH28k34hULTxMQPylPy545OYcnWiK9yVKJcdsCI0yHpAXABpt515OzqE9Jf4wKI0MPKRmmLbgIqNOSSULPPXKwbPtr6cdTFtOKuZjRbIKs4OlsfdsprVMg1xINx7Fmr2Xlp8L0W22nYV3mvc7hTQz2Yc10bkfgimY1f9M7F32r8eZ',
});