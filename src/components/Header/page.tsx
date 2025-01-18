"use client";

import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../utils/fetchCategories";
import { IoSearch } from "react-icons/io5";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    
    getCategories();
  }, []);

  return (
    <>
      <header className="max-w-[1440px] h-[132px] flex flex-col items-center bg-white px-10 lg:w-full mx-auto">
        <div className="border-b-[0.5px] border-[#0000004f] h-1/2 w-full mx-auto flex justify-between items-center">
          {/* Left: Search icon on large screens */}
          <div className="flex items-center gap-3 lg:flex-1">
            <div className="lg:block hidden">
              <IoSearch className="text-xl" />
            </div>
          </div>

          {/* Avion Title */}
          <Link href="/">
            <h1 className="text-[#22202E] text-2xl font-semibold text-left lg:text-center">
              Avion
            </h1>
          </Link>
          
          <div className="flex gap-3 text-xl lg:flex-1 justify-end">
            <Link href="/ShoppingBaskets">
              <MdOutlineShoppingCart />
            </Link>
            <Link href="/About">
              <CgProfile />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1 font-light cursor-pointer"
        >
          <span className="block w-6 h-1 bg-black"></span>
          <span className="block w-6 h-1 bg-black"></span>
          <span className="block w-6 h-1 bg-black"></span>
        </div>

        {/* Mobile Menu with Categories and All Products link */}
        {isOpen && (
          <div className="absolute top-0 left-0 right-0 bg-white shadow-lg p-4">
            <nav className="flex flex-col gap-4 text-lg text-[#726E8D]">
              <Link
                href="/AllProducts" // Add the All Products link
                className="hover:text-[#5a526c]"
                onClick={() => setIsOpen(false)} // Close menu when clicked
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  className="hover:text-[#5a526c]"
                  onClick={() => setIsOpen(false)} // Close menu when category is clicked
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex w-[675px] justify-between items-center h-1/2 text-[#726E8D]">
          <Link
            href="/AllProducts" // Add the All Products link
            className="hover:text-[#5a526c] border-b-2 border-transparent hover:border-[#5a526c] pb-1"
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="hover:text-[#5a526c] border-b-2 border-transparent hover:border-[#5a526c] pb-1"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
