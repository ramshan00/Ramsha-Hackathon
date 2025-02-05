"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { ProductData } from '../../types/ProductType';

export default function Listings() {
    const [newCeramics, setNewCeramics] = useState<ProductData[] | null>(null);

    // Fetch featured products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const ProductListing = await client.fetch(
                    `*[_type == "product"][5..8]{
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
                setNewCeramics(ProductListing);
            } catch (error) {
                console.error("Error fetching featured products:", error);
            }
        };
        fetchProducts();
    }, [])

    return (
        <div className="max-w-[1440px] mx-auto px-4">
            {/* Title */}
            <h1 className="text-[#2A254B] font-clash font-normal text-2xl lg:text-4xl mt-8">
                New Ceramics
            </h1>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {/* Product Card */}
                {newCeramics?.map((item) => (
                    <Link
                        key={item._id}
                        href={`/AllProducts/${item._id}`}
                        className="flex flex-col items-start p-4 rounded-lg shadow-lg"
                    >
                        <div className="relative w-full h-[375px]">
                            <Image
                                src={urlFor(item.image).url()}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="mt-4 space-y-2">
                            <h4 className="text-xl font-semibold text-[#2A254B]"> {item.name} </h4>
                            <p className="text-lg font-medium text-[#2A254B]">&#163;{item.price} </p>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Button */}
            <div className="flex justify-center mt-12">
                <Link href="/AllProducts">
                    <Button className="px-8 py-3 bg-gray-200 text-[#2A254B] font-satoshi text-lg rounded-lg">
                        View collection
                    </Button>
                </Link>
            </div>
        </div>
    );
}
