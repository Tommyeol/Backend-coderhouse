import { useUser } from "../../context/userContext";
import { getCarritoById, removeProductFromCart } from "../../services/carrito";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { productContext } from "../../context/productContext";

export default function CartPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { carrito, setCarrito } = useContext(productContext);
  const navigate = useNavigate();

  const calcularTotal = () => {
    let precios = cart.map((product) => product.precio);
    const num = precios.reduce((a, b) => Number(a) + Number(b), 0);
    return num;
  };

  useEffect(() => {
    if (!user) return;
    getCarritoById().then((res) => {
      setCart(res.products);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setTotal(calcularTotal());
  }, [cart]);

  const handleRemove2 = async (productID) => {
    const response = await removeProductFromCart(productID);
    setCart(response.products);
    setCarrito(response.products.length);
  };

  const handleCheckout = () => {
    fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: cart, total }),
    }).then(navigate("compraExitosa"));

    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  if (!user) return <Navigate to="/login" />;
  return (
    <>
      {user ? (
        <div className=" w-full h-screen grid place-content-center border-red-50">
          {loading && <div className="text-3xl">Loading...</div>}
          {cart.length === 0 && !loading && (
            <h2 className="text-xl mb-5">You don't have items in your cart</h2>
          )}
          {cart.map((product) => {
            return (
              <div
                key={product._id}
                className="bg-white w-full mt-2 flex items-center overflow-hidden hover:scale-[1.01] transition-all group"
              >
                <div className="h-full bg-indigo-100 w-3"></div>
                <div className="bg-slate-50 h-full aspect-square">
                  <img
                    src="placeholder.png"
                    alt="product"
                    className="w-full h-full object-cover m-0"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div className="left px-10 py-5">
                    <p className="font-bold text-2xl">{product.nombre}</p>
                    <p className="text-gray-500">{product.descripcion}</p>
                    <p className="font-semibold text-lg mt-4">
                      ${Number(product.precio).toFixed(2)}
                    </p>
                  </div>
                  <div className="right bg-red-100 text-red-400 px-4 grid place-content-center translate-x-24 group-hover:translate-x-0 transition-transform">
                    <button onClick={() => handleRemove2(product._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="bg-sky-100 w-full mt-2 flex items-center overflow-hidden hover:scale-[1.01] transition-all group"
            onClick={calcularTotal}
          >
            <div className="h-full bg-blue-400 w-2"></div>
            <div className="flex justify-between w-full">
              <div className="left gap-5 px-10 py-7 flex items-center justify-between w-full">
                <p className="font-bold text-3xl">Total</p>
                <p className="font-bold text-3xl">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          {cart.length === 0 ? null : (
            <div>
              <button
                onClick={handleCheckout}
                className="bg-blue-400 mt-5 py-5 font-bold text-xl rounded-lg text-white uppercase w-full"
              >
                Buy
              </button>
              <Outlet />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
