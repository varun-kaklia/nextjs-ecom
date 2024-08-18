// src/components/CartItem.jsx
import { cartState } from "@/store/cartState";
import AddOn from "@/ui/addOn";
import { FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";

const CartItem = ({ item }) => {
  const [, setCart] = useRecoilState(cartState);

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

  return (
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
        <div className="flex items-center mt-2 lg:w-1/3 md:w-2/3 sm:w-full">
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
  );
};

export default CartItem;
