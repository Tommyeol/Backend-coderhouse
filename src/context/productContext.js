import { createContext, useState } from "react";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState(0);

  return (
    <productContext.Provider
      value={{ Products, setProducts, carrito, setCarrito }}
    >
      {children}
    </productContext.Provider>
  );
};
