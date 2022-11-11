import { useEffect, useContext } from "react";
import { productContext } from "../../context/productContext";
import { getCarritoById } from "../../services/carrito";

export default function Carrito() {
  const { carrito, setCarrito } = useContext(productContext);

  useEffect(() => {
    getCarritoById().then((res) => {
      setCarrito(res.products.length);
    });
  }, [setCarrito]);

  return (
    <div className="w-12">
      <div className="w-12 scale-50 ml-3">
        {carrito >= 1 ? (
          <p className="absolute scale-75 -top-4 -right-5 bg-indigo-500 w-12 h-12 grid place-content-center text-white font-bold rounded-full text-3xl">
            {carrito}
          </p>
        ) : null}

        <img src="/cart.svg" alt="cart" className="w-12 m-0 ml-auto" />
      </div>
    </div>
  );
}
