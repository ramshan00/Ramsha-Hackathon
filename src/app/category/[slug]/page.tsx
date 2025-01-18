import { fetchProductsByCategory } from "../../../../utils/fetchProductsByCategory";
import { fetchCategoryBySlug } from "../../../../utils/fetchCategoryBySlug";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  currentSlug: string;
}

interface CategoryPageProps {
  params: { slug: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = params;

  // Fetch the category
  const category = await fetchCategoryBySlug(slug);

  // If category doesn't exist, show an error or empty page
  if (!category) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
      </div>
    );
  }

  // Fetch the products associated with this category
  const products: Product[] = await fetchProductsByCategory(slug);

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category.name} Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/AllProducts/${product.currentSlug}`}
              className="relative block group w-full max-w-[305px] h-[462px] rounded-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-[75%] bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Product Details */}
              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-xl font-semibold text-[#2A254B]">
                  {product.name}
                </h4>
                <p className="text-lg font-medium text-[#2A254B]">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products available in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
