import { useRecoilState } from "recoil";
import CustomButton from "../button";
import { cartState } from "@/store/cartState";

const AddOn = ({ children, quantity, id }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addItem = () => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const removItme = () => {
    if (quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
    }
  };
  

  return (
    <div className="w-full flex items-center justify-between">
      <CustomButton text="-" customClass={"w-1/4"} onClickHandle={removItme} />
      {children}
      <CustomButton text="+" customClass={"w-1/4"} onClickHandle={addItem} />
    </div>
  );
};

export default AddOn;
