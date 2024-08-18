"use client"
import { cartState } from "@/store/cartState";
import AddOn from "@/ui/addOn";
import CustomButton from "@/ui/button";
import Modal from "@/ui/modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { discount as discountApply } from "@/store/discount";
import { coupons } from "@/constants/coupons";

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [isCouponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const discount = useRecoilValue(discountApply);

  const handleApplyCoupon = () => {
    if (coupons[couponCode]) {
      setAppliedCoupon(couponCode);
      setCouponOpen(false);
    } else {
      alert("Invalid Coupon Code");
    }
  };

  const handleCancelCoupon = () => {
    setAppliedCoupon(null);
    setCouponOpen(false);
  };

  const handleQuantityChange = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTax = (subtotal) => (subtotal * 0.15).toFixed(2);

  const calculateShipping = (location) => (location === "India" ? 60 : 150);

  const calculateTotalWithGST = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const gst = parseFloat(calculateTax(subtotal));
    const shipping = calculateShipping("India");
    const totalWithGST = subtotal + gst + shipping - discount.fixed;
    return totalWithGST.toFixed(2);
  };

  return (
    <div className="p-4 bg-white w-full shadow-lg rounded-lg">
      <Modal
        isOpen={isCouponOpen}
        onClose={() => setCouponOpen(false)}
        title="Apply Coupon"
      >
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Enter coupon code"
        />
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleCancelCoupon}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-customBlue text-white rounded-md"
          >
            Apply
          </button>
        </div>
      </Modal>

      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4 mb-4">
              <img
                src={item.image}
                alt={item.productName}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p
                  title={item?.productDescription}
                  className="text-xs text-gray-600 break-words max-h-[15px] overflow-hidden"
                >
                  {item.productDescription}
                </p>
                <div className="flex items-center">
                  <p className="text-gray-700 line-through">
                    ${(item.price + item?.discount).toFixed(2)}
                  </p>
                  <p className="text-gray-700 font-semibold px-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center mt-2 w-1/3">
                  <AddOn quantity={item?.quantity} id={item?.id}>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-20 p-1 border text-center border-gray-300 rounded-md mx-2"
                    />
                  </AddOn>
                  <button
                    title="Remove Item"
                    onClick={() => handleRemoveItem(item.id)}
                    className="flex items-center justify-center w-8 h-8 bg-red-500 ml-2 text-white rounded-md hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-end">
            {appliedCoupon ? (
              <div className="flex items-center mb-4">
                <p className="mr-2">Coupon: {appliedCoupon}</p>
                <button
                  onClick={handleCancelCoupon}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCouponOpen(true)}
                className="px-4 py-2 mb-4 bg-customBlue text-white rounded-md"
              >
                Apply Coupon
              </button>
            )}
            <div className="flex flex-col items-end mt-4">
              <div className="font-bold text-lg">Price Breakup</div>
              <div className="mt-2 text-sm">
                <div>Cart Value: ${calculateSubtotal()}</div>
                <div>Tax (15%): ${calculateTax(calculateSubtotal())}</div>
                <div>Shipping: ${calculateShipping("India")}</div>
                <div>Discount on Item: ${discount?.fixed}</div>
                {appliedCoupon && (
                  <div className="text-green-600">
                    Applied Coupon: -${coupons[appliedCoupon]}
                  </div>
                )}
                <div className="font-bold mt-2">
                  Total: ${calculateTotalWithGST()}
                </div>
              </div>
            </div>
            <CustomButton
              text={"Checkout"}
              customClass={"w-[20%] max-w-[30%] mt-4"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
