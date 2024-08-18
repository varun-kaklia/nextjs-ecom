"use client";
import Product from "@/components/Product";
import { getProduct } from "@/services/getProduct";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getData = async () => {
    setLoading(true);
    try {
      const req = await getProduct();
      if (req?.length > 0) {
        setData(req);
      }
    } catch (error) {
      console.error("Error while fetching", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (error) {
    return <div className="text-center">Error while fetching product...</div>;
  }
  if (loading) {
    return <div className="text-center">Loading product, please wait...</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full justify-items-center items-center">
      {data?.length > 0 ? (
        data?.map((product, index) => {
          return (
            <Product
              key={index}
              productDescription={product?.description}
              productName={product?.title}
              price={product?.price}
              image={product?.image}
              id={product?._id}
            />
          );
        })
      ) : (
        <div className="text-center">No Products Available...</div>
      )}
    </div>
  );
}
