"use client";

import CustomButton from "@/ui/button";
import Link from "next/link";

const SuccessPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Congratulations!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been successfully registered with us.
        </p>
        <Link href={"/"}>
        <CustomButton
          text="Continue Shopping"
          customClass="bg-customBlue text-white"
        />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
