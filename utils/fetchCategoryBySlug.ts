import { client } from "@/sanity/lib/client";

export async function fetchCategoryBySlug(slug: string) {
  const category = await client.fetch(
    `*[_type == "category" && slug.current != $slug][0]`, 
    { slug }
  );

  return category;
}
