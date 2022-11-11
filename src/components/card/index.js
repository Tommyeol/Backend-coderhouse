import { useContext, useState } from "react";
import { productContext } from "../../context/productContext";
import { addProductToCart, getCarritoById } from "../../services/carrito";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import "./card.css";

export default function Card({ product }) {
  const { setCarrito } = useContext(productContext);
  const { user } = useUser();
  const [message, setMessage] = useState({ show: false, status: "" });
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!user) {
      navigate("/login");
    } else {
      await addProductToCart(product);
      const result = await getCarritoById();

      setCarrito(result.products.length);
      setMessage({ show: true, status: "Product added to cart" });
      setTimeout(() => {
        setMessage({ show: false, status: "" });
      }, 5000);
    }
  };

  return (
    <>
      <div className="card pb-8 rounded-xl">
        <img src="/placeholder.png" alt="placeholder" />
        <div className="flex flex-col justify-evenly h-64 border-none">
          <h3 className="font-bold text-center text-lg mb-2">{product.name}</h3>
          <p className="text-center text-sm px-5 mb-7">{product.description}</p>
          <div>
            <p className="text-center font-bold text-3xl">{`$${product.price}`}</p>
            <button
              onClick={addProduct}
              className="w-1/2 bg-black text-white rounded-xl font-bold py-3 mt-10 mx-auto block scale-90 active:scale-[.87] active:transition-transform"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {message.show && (
        <p className="text-slate-800 w-56 text-center  border-lime-500 text-md fixed top-16 right-5 bg-white rounded-xl px-4 py-3 shadow-md shadow-lime-200/50 animate-toastyAnim">
          {message.status}
        </p>
      )}
    </>
  );
}
