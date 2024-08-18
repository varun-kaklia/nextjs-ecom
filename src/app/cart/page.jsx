"use client";

import { cartState } from "@/store/cartState";
import AddOn from "@/ui/addOn";
import CustomButton from "@/ui/button";
import { useRecoilState } from "recoil";

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  console.log("cart", cart);

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

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto my-2 bg-white w-full shadow-lg rounded-lg">
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
                <p className="text-gray-700">${item.price}</p>
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
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between max-h-10">
            <div className="font-bold text-lg mt-4">
              Total: ${calculateTotal()}
            </div>
            <CustomButton text={"Pay"} customClass={"w-[20%]"}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
