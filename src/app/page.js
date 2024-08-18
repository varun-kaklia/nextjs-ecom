"use client";
import Product from "@/components/Product";
import { getProduct } from "@/services/getProduct";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await getProduct();
        if (req?.length > 0) {
          setData(req);
        }
      } catch (error) {
        console.error("Error while fetching product:", error);
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading products, please wait...</div>;
  }

  if (error) {
    return <div className="text-center">{error||"Error while getting product list."}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full justify-items-center items-center">
      {data.length > 0 ? (
        data.map((product) => (
          <Product
            key={product._id}
            productDescription={product.description}
            productName={product.title}
            price={product.price}
            image={product.image}
            id={product._id}
          />
        ))
      ) : (
        <div className="text-center">No Products Available...</div>
      )}
    </div>
  );
}
