"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; // Import the Sanity client
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Handle changes in search input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Fetch products based on search query using GROQ
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.length > 0) {
        try {
          // Construct the GROQ query
          const query = `*[_type == "product" && name match "${searchQuery}*"]{
            _id,
            name,
            price,
            "imageUrl": image.asset->url
          }`;

          // Fetch products from Sanity using the query
          const data = await client.fetch(query);
          setSearchResults(data.slice(0, 5)); // Limit to 5 products
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="relative w-full max-w-[150px]">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search here..."
        className="w-full p-2 pl-10 "
      />
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
      >
        <FaSearch size={20} />
      </button>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-gray-800 shadow-lg max-h-[400px] overflow-y-auto">
          {searchResults.map((product) => (
            <Link
              key={product._id}
              href={`/AllProducts/${product._id}`} // Link to the product details page
            >
              <div className="flex items-center gap-4 p-2 hover:bg-gray-700 cursor-pointer">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={16}
                  height={16}
                  className="object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-100">{product.name}</p>
                  <p className="text-sm text-gray-100">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
