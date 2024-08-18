"use client";

import Link from "next/link";
import { useRecoilValue } from "recoil";
import { FaShoppingCart } from "react-icons/fa"; // Importing the cart icon
import { cartState } from "@/store/cartState";
import { useEffect, useState } from "react";

const NavBar = () => {
  const cart = useRecoilValue(cartState);
  const [blink, setBlink] = useState(false);
  const totalItems = cart?.reduce((totalItems, item) => totalItems + item?.quantity, 0);

  useEffect(() => {
    if (cart.length) {
      setBlink(true);
      const timeout = setTimeout(() => setBlink(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [totalItems]);

  return (
    <div className="w-full flex h-12 p-3 px-6 bg-customBlue justify-between sticky top-0 z-50 items-center">
      <Link href="/">
        <h1 className="text-white">Next Ecom</h1>
      </Link>
      <div className="relative">
        <Link href="/cart" className="text-white flex items-center">
          <FaShoppingCart size={24} />
          <span
            className={`absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center ${
              blink ? "animate-ping" : ""
            }`}
          >
            {totalItems}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
