"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Header/page";
import SignUpSection from "@/components/Signup";
import { ProductData } from "@/app/types/ProductType";

interface Category {
    _id: string; // Unique identifier for the category
    name: string; // Name of the category
}
const CategoryPage = () => {
  const params = useParams(); // Getting the route parameter for category ID
  const categoryId = params.id; // categoryId based on the route
  const [category, setCategory] = useState<Category | null>(null);  // Category data
  const [products, setProducts] = useState<ProductData[] | null>(null); // Products in the category

  // Fetch category data by category ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await client.fetch(
          `*[_type == "category" && _id != categoryId]{
            _id,
            name,
            slug
          }`,
          { categoryId }
        );
        setCategory(categoryData[0]);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, [categoryId]);

  // Fetch products of the category based on category ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await client.fetch(
          `*[_type == "product" && category._ref == $categoryId]{
            _id,
            name,
            price,
            description,
            image {
              asset->{
                _id,
                url
              }
            }
          }`,
          { categoryId }
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const categoryName = products && products.length > 0 ? products[0].category : "Unknown Category";

  return (
  <div className="bg-gray-50 min-h-screen">
    <header>
      <Navbar />
    </header>
    <div className="container mx-auto px-4 mt-8">
      {/* Products in Category */}
      {products && products.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-[34px] font-extrabold text-[#2A254B] leading-[150%] mb-6 text-center">
            Top Picks in {categoryName} — Handpicked Just for You!
          </h2>
          {/* Render the products */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/AllProducts/${product._id}`}
                className="relative block group w-full max-w-[305px] h-[462px] rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-[75%] bg-gray-200">
                  <Image
                    src={`${urlFor(product.image).url()}`}
                    alt={`${product.name} Image`}
                    fill
                    className="object-cover"
                  />
                </div>
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
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">No products available in this category.</p>
      )}
      {/* Signup Section */}
      <SignUpSection />
      </div>
    </div>
    
);
};

export default CategoryPage;
