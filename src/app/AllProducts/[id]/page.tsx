"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import Navbar from "./navbar";
import SignUpSection from "../../../components/Signup";
import { ProductData } from "../../../types/ProductType";
import { useCart } from "../../../../context/Cart_Context";


const ProductPage = () => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (ProductDetails) {
        // Extract and format necessary details
        const itemId = Number(ProductDetails._id); // Convert _id to a number (if necessary)
        
        // Dispatch ADD_TO_CART action with the formatted payload
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                _id: itemId, // Use _id as id
                name: ProductDetails.name,
                description: ProductDetails.description,
                price: ProductDetails.price,
                image: ProductDetails.image.asset.url, // Access the image URL properly
                quantity: quantity, // Use the current quantity from the state
            },
        });
    } else {
        console.error('Product details are not available!');
    }
};
  const params = useParams(); // Getting the route parameter
  const productId = params.id;
  const [ProductDetails, setProductDetails] = useState<ProductData | null>(null);
  const [FeaturedProduct, setFeaturedProduct] = useState<ProductData[] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: { target: { value: string; }; }) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
        setQuantity(value);
    } else {
        setQuantity(1); // Prevent negative or invalid inputs
    }
};

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
          }`
        );
        setFeaturedProduct(features);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchProducts();
  }, []);


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
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="w-12 h-full text-black hover:bg-gray-100 flex justify-center items-center"
              >
                 -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
                className="w-16 h-full text-center outline-none border-none appearance-none [-moz-appearance:none] [-webkit-appearance:none]"
              />
              <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full text-black hover:bg-gray-100 flex justify-center items-center"
              >
               +
              </button>
              </div>

              {/* Add to Cart */}
              <div className="mt-6 justify-end">
                <Link href="/ShoppingBaskets">
                <Button  onClick= {handleAddToCart} className="mt-4 bg-gray-800 hover:bg-gray-400 text-white px-6 py-2 rounded-md">
                  Add to Cart
                  </Button>
                  </Link>
              </div>
            </div>
          </div>
        )}


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
        <h2 className="text-lg font-semibold mt-4 text-center">{item.name}</h2>
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
