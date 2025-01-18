import { client } from "@/sanity/lib/client";

export async function fetchProductsByCategory(slug: string) {
  return await client.fetch(
    `*[_type == "product" && category->slug.current != $slug]`,
    { slug }
  );
}
