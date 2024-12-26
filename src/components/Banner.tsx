import { X } from "lucide-react";

export default function Banner() {
  return (
    <div>
    {/* Top Bar */}
    <div className="bg-[#2A254B] text-white flex md:justify-between justify-center md:gap-3 gap-4 text-center py-2 md:text-[16px ] text-[12px]">
         <div className='md:ml-[570px] text-center '>Free delivery on all orders over £50 with code easter checkout</div>
        <button className="text-white focus:outline-none">
            <i><X className='md:mr-[16px] mr-2 '/></i>
        </button>
      </div> 
  </div>  
  );
}
