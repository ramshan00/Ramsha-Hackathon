"use client";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { ProductData } from '../../types/ProductType';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PopularProduct = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = await client.fetch(
          `*[_type == "product"]{
              _id,
              name,
              price,
              image {
                  asset->{
                      _id,
                      url
                  }
              }
          }`
        );
        setProducts(query);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-y-2 mt-10 px-5 md:px-10 xl:px-0">
      <h1 className="clashDisplay md:text-[2rem] text-[20px] font-[400px] md:self-center self-start mb-3 xl:self-start">
        Our Popular Products
      </h1>

      {/* Swiper Component with Auto Slide Only */}
      <Swiper
        modules={[Autoplay]}  // Only Autoplay module
        autoplay={{ delay: 1000 }}  // Auto slide every 1 second
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },  
        }}
        className="w-full"
      >
        {/* Render Product Cards in Swiper Slides */}
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300 w-full max-w-[300px] mx-auto bg-transparent"
            >
              <Link href={`/AllProducts/${product._id}`}>
                <div className="relative w-full h-64">
                  {/* Image */}
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-[#2A254B]">{product.name}</h4>
                  <p className="text-lg font-medium text-[#2A254B]"> &#163; {product.price}</p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Button */}
      <div className="flex justify-center mt-12">
        <Link href="/AllProducts">
          <Button className="px-8 py-3 bg-gray-200 text-[#2A254B] font-satoshi text-lg rounded-lg">
            View collection
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default PopularProduct;
