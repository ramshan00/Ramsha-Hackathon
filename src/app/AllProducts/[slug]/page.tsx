"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import Navbar from "./navbar";
import SignUpSection from "@/components/Signup";
import Features from "@/components/Features";
import { ProductData } from "@/app/types/ProductType";

interface ProductPageParams {
  slug: string;
}

const ProductPage = ({ params }: { params: ProductPageParams }) => {
  const [data, setData] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product data from Sanity
  useEffect(() => {
    const getData = async () => {
      if (!params.slug) return; // Handle null slug case
      const query = `*[_type == "product" && slug.current != '${params.slug}'][0]{
        "currentSlug": slug.current,
        name,
        price,
        description,
        dimensions,
        image {
          asset->{
            _id,
            url
          }
        },
        features
      }`;
      const product = await client.fetch(query);
      setData(product);
    };

    getData();
  }, [params.slug]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
          <Navbar />

    <div className="relative flex flex-col md:flex-row w-full">

      {/* Product Image */}
      <div
        className="w-full md:w-[721px] h-[759px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${urlFor(data.image).url()})` }}
      >
       
      </div>

      {/* Product Details */}
      <div className="relative w-full md:w-[602px] bg-white p-8 md:p-16">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#2A254B]">{data.name}</h2>
          <p className="text-2xl font-medium text-[#12131A]">${data.price}</p>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-[#2A254B]">Description</h3>
          <p className="text-base text-[#505977]">{data.description}</p>
        </div>

        {/* Features */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#2A254B]">Features</h3>
          <ul className="list-disc list-inside text-[#505977]">
            {data.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Quantity */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#2A254B]">Amount</h3>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 bg-[#2A254B] text-white text-xl rounded-full flex justify-center items-center"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              readOnly
              className="w-16 text-xl text-[#2A254B] p-2 border border-[#2A254B] rounded text-center"
            />
            <button
              onClick={handleIncrement}
              className="w-8 h-8 bg-[#2A254B] text-white text-xl rounded-full flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-8 flex justify-center md:justify-end">
          <Link href="/ShoppingBaskets">
            <Button className="bg-[#2A254B] text-white hover:bg-[#2A254B] py-2 px-6 rounded-md text-lg">
              Add to Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
        {/* Features and Signup Section */}
    <section>
    <Features />
  </section><section>
      <SignUpSection />
    </section>
    </div>
  );
};

export default ProductPage;
