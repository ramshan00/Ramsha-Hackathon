// utils/fetchCategories.ts

import { client } from '../sanity/lib/client'; 

export async function fetchCategories() {
  try {
    const categories = await client.fetch(`*[_type == "category"]`);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
