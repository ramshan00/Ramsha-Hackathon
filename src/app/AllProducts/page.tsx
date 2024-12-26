import { Button } from '@/components/ui/button';
import ProductCard from './productCard';
import Navbar from './header';
import Link from 'next/link';

const products = [
  { title: 'The Dandy chair', price: '£250', imageUrl: '/img1.png' },
  { title: 'Rustic vase set', price: '£180', imageUrl: '/img2.png' },
  { title: 'The silky vase', price: '£120', imageUrl: '/img3.png' },
  { title: 'The Lucky lamp', price: '£350', imageUrl: '/img4.png' },
  { title: 'The Dandy chair', price: '£400', imageUrl: '/pro1.png' },
  { title: 'Rustic vase set', price: '£300', imageUrl: '/pro2.png' },
  { title: 'The silky vase', price: '£280', imageUrl: '/pro3.png' },
  { title: 'The Lucky lamp', price: '£200', imageUrl: '/pro4.png' },

];

export default function Home() {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <div className="space-y-12 py-10">
        {/* Upper Section: 4 Cards */}
        <div className="flex justify-center gap-8 flex-wrap">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={index} title={product.title} price={product.price} imageUrl={product.imageUrl} />
          ))}
        </div>

        {/* Middle Section: Different Image Layout */}
        <div className="flex justify-center gap-8 flex-wrap">
          {products.slice(4, 8).map((product, index) => (
            <ProductCard key={index} title={product.title} price={product.price} imageUrl={product.imageUrl} />
          ))}
        </div>

        {/* Lower Section: 4 Cards */}
        <div className="flex justify-center gap-8 flex-wrap">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={index} title={product.title} price={product.price} imageUrl={product.imageUrl} />
          ))}
        </div>

        {/* button */}
        <Link href="/ProductListing" className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-gray-200 text-[#2A254B] font-satoshi text-lg rounded-lg">
            View Product Details
          </button>
        </Link>
      </div>
      </>
  );
}
