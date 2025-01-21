"use client";

import Header from "@/components/Header/page";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../../../context/Cart_Context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ShoppingBasket() {
  const router = useRouter();
  const { cart, removeFromCart } = useCart();
// Log cart to ensure the items contain a valid `id`
console.log(cart);
  const handleRemove = (id: number) => {
    console.log(`Removing item with id: ${id}`);  // Debugg
    removeFromCart(id); // Ensure this method properly handles removing the item by its id
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to checkout.");
    } else {
      router.push("/checkout"); // Redirect to checkout page
    }
  };

  return (
    <div className="md:ml-33">
      <Header />
      <div className="container max-w-[1200px] py-12 px-10">
        {/* Cart Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Your shopping cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-12">
            <div className="flex justify-center items-center flex-col">
              <ShoppingCart size={80} className="text-gray-400 mb-4" />
              <p>Your cart is empty :(</p>
              <Link href="/AllProducts">
                <Button className="mt-4 bg-gray-700 text-white hover:bg-gray-800 rounded-xl">
                  Shop
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Product Section */}
            <div className="md:w-full">
              <div className="grid grid-cols-[2fr,1fr,1fr] gap-3 pb-4 border-b text-sm text-gray-500">
                <div className="hidden md:block">Product</div>
                <div className="md:text-center md:block hidden">Quantity</div>
                <div className="md:text-center md:block hidden">Total</div>
              </div>

              {cart.map((item) => {
                return (
                  <div key={item.id} className="grid md:grid-cols-[2fr,1fr,1fr] gap-4 py-8 items-center border-b">
                    <div className="flex gap-6">
                      <div>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={500}
                          height={500}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-normal mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                        <p className="text-base">&#163; {item.price}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        className="w-14 h-8 text-center border rounded-md"
                        onChange={(e) => console.log("Update Quantity", e.target.value)} 
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>&#163; {(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        onClick={() => handleRemove(item.id)} 
                        className="text-[#c23535] ml-2"
                      >
                        <Trash2 size={24} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Section */}
            <div className="mt-8 flex flex-col items-center md:items-end gap-4">
              <div className="flex justify-between w-full max-w-xs">
                <span className="text-gray-500">Subtotal</span>
                <p className="text-md sm:text-base font-semibold text-gray-800">
                  &#163; {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                </p>
              </div>
              <div className="text-sm text-gray-600">
                Taxes and shipping are calculated at checkout
              </div>
              {/* Checkout Button */}
              <Button
                className="bg-[#2A254B] text-white px-6 py-3 rounded-md hover:bg-gray-800"
                onClick={handleCheckout}
              >
                Go to checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}