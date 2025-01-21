"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import Navbar from "./navbar";
import SignUpSection from "@/components/Signup";
import { ProductData } from "@/app/types/ProductType";
import { useCart } from "../../../../context/Cart_Context";


const ProductPage = () => {
  const { addToCart } = useCart();
  const params = useParams(); // Getting the route parameter
  const productId = params.id;
  const [ProductDetails, setProductDetails] = useState<ProductData | null>(null);
  const [FeaturedProduct, setFeaturedProduct] = useState<ProductData[] | null>(null);
  const [quantity, setQuantity] = useState(1);


  // Fetch product data from Sanity
  useEffect(() => {
    const getData = async () => {
      try {
        const products = await client.fetch(
          `*[_type == "product" ]{
         _id,
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
 }`
        );
        // Find the product based on productId
        const product = products.find(
          (item: ProductData) => item._id === productId
        );
        
        setProductDetails(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getData();
  }, [productId]);

  // Fetch featured products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const features = await client.fetch(
          `*[_type == "product"][2..5]{
            id,
            name,
            price,
            description,
            image {
              asset->{
                _id,
                url
              }
            }
          }`
        );
        setFeaturedProduct(features);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Increment and Decrement quantity
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    if (ProductDetails) {
      const itemId = Number(ProductDetails._id); // Use _id from ProductDetails
      addToCart({
        id: itemId, // Ensure _id is used instead of id
        name: ProductDetails.name,
        description: ProductDetails.description,
        price: ProductDetails.price,
        image: ProductDetails.image.asset.url, // Accessing image URL properly
        quantity: quantity, // Use the current quantity state
      });
    }
  };
  
  
  return (
    <div>
      <Navbar />
      <div className="relative w-full mx-auto mt-8">
        {/* Product Details */}
        {ProductDetails && (
          <div className="w-full bg-white flex flex-col md:flex-row gap-6 p-6">
            <div className="md:w-1/2">
              <Image
                src={`${urlFor(ProductDetails.image).url()}`}
                alt={`${ProductDetails.name} Image`}
                width={500}
                height={500}
                className="w-full object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-[#2A254B]">{ProductDetails.name}</h3>
              <h4 className="text-xl font-semibold mt-2 text-[#2A254B]">&#163; {ProductDetails.price}</h4>
              <p className="mt-4 text-gray-600 ">{ProductDetails.description}</p>
              <h3 className="text-lg font-semibold mt-6 text-[#2A254B]">Features:</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {ProductDetails.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              {/* Dimensions */}
<div className="mt-6">
  <h3 className="text-lg font-semibold text-[#2A254B]">Dimensions:</h3>
  <div className="flex gap-8 mt-2 text-gray-600">
    <div className="flex flex-col items-center">
      <span className="font-semibold text-[#2A254B]">Height</span>
      <span>{ProductDetails.dimensions.height} </span>
    </div>
    <div className="flex flex-col items-center">
      <span className="font-semibold text-[#2A254B]">Width</span>
      <span>{ProductDetails.dimensions.width} </span>
    </div>
    <div className="flex flex-col items-center">
      <span className="font-semibold text-[#2A254B]">Depth</span>
      <span>{ProductDetails.dimensions.depth} </span>
    </div>
  </div>
</div>
              {/* Quantity */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 bg-gray-800 text-white rounded-full"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border border-gray-300 rounded"
                />
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 bg-gray-800 text-white rounded-full"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <div className="mt-6 justify-end">
                <Link href="/ShoppingBaskets">
                <Button  onClick={handleAddToCart} className="mt-4 bg-gray-800 hover:bg-gray-400 text-white px-6 py-2 rounded-md">
                  Add to Cart
                  </Button>
                  </Link>
              </div>
            </div>
          </div>
        )}

     {/* Featured Products */}

     {/* Featured Products */}
<div className="mt-12">
  <h2 className="text-2xl font-extrabold text-center text-[#2A254B] mb-4">
    You Might Also Like
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {FeaturedProduct?.map((item) => (
      <div
        key={item._id}
        className="p-4 rounded-lg shadow-lg flex flex-col items-center justify-between h-full"
      >
        <Image
          src={urlFor(item.image).url()}
          alt={item.name}
          width={300}
          height={300}
          className="object-cover rounded-lg"
        />
        <h3 className="text-lg font-semibold mt-4 text-center">{item.name}</h3>
        <Link href={`/AllProducts/${item._id}`}>
          <Button className="mt-4 bg-[#2A254B] hover:bg-[#2A254B] text-white w-full">
            View Details
          </Button>
        </Link>
      </div>
    ))}
  </div>
</div>

        {/* Signup Section */}
        <SignUpSection />
      </div>
    </div>
  );
};

export default ProductPage;
