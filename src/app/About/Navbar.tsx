"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Banner from '../../components/Banner';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SearchBar from '@/components/SearchBar';
import { fetchCategories } from "../../../utils/fetchCategories"; 
import { useCart } from "../../../context/Cart_Context";

interface Category {
  _id: string;
  name: string;
}

export default function Navbar() {
  const { state } = useCart();  // cartCount from context
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);
  
  return (
    <header className="w-full bg-white">
      <Banner />
      
      {/* Top Bar */}
      <div className="flex justify-between items-center py-4 px-8">
        {/* Brand Name */}
        <div className="text-2xl font-bold text-[#22202E]">
          <Link href="/">Avion</Link>
        </div>


           {/* Right Side Links for desktop */}
           <div className="hidden ml-auto lg:flex gap-4 justify-center">
          <Link href="/About" className="text-[#726E8D] text-sm">About Us</Link>
          <Link href="/contact" className="text-[#726E8D] text-sm">Contact</Link>
          <Link href="/blog" className="text-[#726E8D] text-sm">Blog</Link>
        </div>

        {/* Right: Cart, Profile, Search icons for large screens */}
        <div className="flex gap-3 text-xl justify-end">
          
        <div className="relative">
        <SearchBar /> 
          </div>

            {/* Shopping Cart Icon */}
        <Link href="/ShoppingBaskets" className="relative">
          <MdOutlineShoppingCart size={24} />
          <div
          className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-2 left-4 flex items-center justify-center ${
            state.items.length > 9 ? 'w-6 px-1' : 'w-5'
          }`}
        >
          {state.items.length}
        </div>
        </Link>
          
         <Link href="/About">
          <CgProfile size={24} />
        </Link>
        </div>
        

        
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger>
            <div className="lg:hidden cursor-pointer flex flex-col gap-1">
              <span className="block w-6 h-1 bg-black"></span>
              <span className="block w-6 h-1 bg-black"></span>
              <span className="block w-6 h-1 bg-black"></span>
            </div>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 text-lg text-[#726E8D]">
          <Link
            href="/AllProducts"
            className="hover:text-[#5a526c]"
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/Category/${category._id.toString()}`}
              className="hover:text-[#5a526c]"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/About"
            className="hover:text-[#5a526c]"
          >
            About
          </Link>
        </nav>
    
          </SheetContent>
        </Sheet>
</div>
      {/* Desktop Navigation links */}
 <nav className="hidden lg:flex flex-1 justify-center items-center gap-4 text-[#726E8D]">
        <Link
          href="/AllProducts"
          className="hover:text-[#5a526c] border-b-2 border-transparent hover:border-[#5a526c] pb-1"
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/Category/${category._id.toString()}`}
            className="hover:text-[#5a526c] border-b-2 border-transparent hover:border-[#5a526c] pb-1"
          >
            {category.name}
          </Link>
        ))}
        <Link
          href="/About"
          className="hover:text-[#5a526c] border-b-2 border-transparent hover:border-[#5a526c] pb-1"
        >
          About
        </Link>
      </nav>

    </header>
  );
}