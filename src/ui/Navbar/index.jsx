"use client";

import Link from "next/link";

const { cartState } = require("@/store/cartState");
const { useRecoilValue } = require("recoil");

const NavBar = () => {
  const cart = useRecoilValue(cartState);
  const sum = cart?.reduce((totalItems,cart)=>totalItems+cart?.quantity,0)
  return (
    <div className="w-full flex h-12 p-3 px-6 bg-customBlue justify-between items-center">
      <Link href="/">
        <h1 className="text-white">Next Ecom</h1>
      </Link>
      <div>
        <Link href="/cart" className="text-white">
          {cart?.length ? sum : 0}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
