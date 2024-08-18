import { useRecoilState } from 'recoil';
import { cartState } from '@/store/cartState';

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      const formattedPrice = parseFloat(item.price).toFixed(2);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1, price: formattedPrice }];
    });
  };

  return {
    cart,
    addToCart,
  };
};

export default useCart;
