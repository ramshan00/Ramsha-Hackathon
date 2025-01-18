"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./header";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  currentSlug: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        _id,
        name,
        price,
        tags,
        "imageUrl": image.asset->url,
        currentSlug
      }`;

      const products = await client.fetch(query);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header>
        <Navbar />
      </header>
      <div className="container mx-auto px-4 mt-8">
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/AllProducts/${product.currentSlug}`}
              className="relative block group w-full max-w-[305px] h-[462px] rounded-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-[75%] bg-gray-200">
                <Image
                  src={product.imageUrl}
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
      </div>
    </div>
  );
}
