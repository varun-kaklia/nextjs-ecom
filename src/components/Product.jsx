"use client";
import { cartState } from "@/store/cartState";
import { discount } from "@/store/discount";
import AddOn from "@/ui/addOn";
import CustomButton from "@/ui/button";
import { useRecoilState, useRecoilValue } from "recoil";

const Product = ({ productName, productDescription, image, price, id }) => {
  const [cart, setCart] = useRecoilState(cartState);
  const customDiscount = useRecoilValue(discount);
  const existingProduct = cart.find((item) => item.id === id);
  const onClickHandle = () => {
    const product = {
      id,
      productName,
      productDescription,
      image,
      price: price - customDiscount?.fixed,
      quantity: 1,
      discountApplied:true,
      discount:customDiscount?.fixed,
    };
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }
  };
  return (
    <div className="border p-2 w-[250px] my-2 group transition-all delay-150 duration-150 rounded-md shadow-md border-gray-200 hover:shadow-lg">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="border border-gray-300 rounded-md relative overflow-hidden h-[220px]">
          <img
            alt={productName}
            className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
            src={image}
          />
          <div className="absolute top-0 right-0 group-hover:custon-transition group-hover:bg-customBlue transition-all text-white delay-150 duration-150 flex items-center justify-between bg-[#0041a8] rounded-md rounded-br-none rounded-tl-none w-[18%] min-w-fit h-[12%]">
            <p className="text-center px-1 text-sm line-through">${price}</p>
            <p className="text-center px-1 text-sm">
              ${price - customDiscount?.fixed}
            </p>
          </div>
        </div>
        <h3 className="pt-2 font-semibold text-gray-800 text-center">
          {productName}
        </h3>
        <p
          title={productDescription}
          className="text-xs text-center text-gray-600 break-words max-h-[15px] overflow-hidden"
        >
          {productDescription}
        </p>
        <div className="mt-2">
          {existingProduct && existingProduct?.quantity !== 0 ? (
            <AddOn
              quantity={existingProduct?.quantity}
              existingProduct={existingProduct}
              id={id}
            >
              <div className="w-full text-center">
                {existingProduct?.quantity}
              </div>
            </AddOn>
          ) : (
            <CustomButton
              text="Add to Cart"
              onClickHandle={() => onClickHandle()}
              customClass={"hover:"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
