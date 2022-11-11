import { useState } from "react";
import { createProducts } from "../../services/createMockProducts.js";
import { Link } from "react-router-dom";

export default function Mock() {
  const [mockProducts, setMockProducts] = useState(null);

  const showMockProducts = async () => {
    const { products } = await createProducts();
    setMockProducts(products);
  };

  return (
    <div>
      <div className="p-10">
        <h2 className="text-2xl text-center font-bold">Mock Products</h2>
      </div>

      {!mockProducts ? (
        <div
          className="cursor-pointer w-max mx-auto"
          onClick={showMockProducts}
        >
          <div className="text-white text-2xl bg-slate-800 rounded-full w-8 h-8 grid place-content-center mx-auto mb-4 animate-bounce">
            &darr;
          </div>
          <p className="text-center">Click to show products</p>
        </div>
      ) : (
        <div className="mt-20 pb-16">
          <table className="max-w-3xl mx-auto rounded-lg shadow-md overflow-hidden ">
            <thead className="bg-slate-300">
              <tr>
                <th className="py-4 px-6">Products</th>
                <th>Description</th>
                <th className="px-6">Price</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p) => (
                <tr
                  key={p.nombre}
                  className="odd:bg-white even:bg-indigo-50/50 h-20"
                >
                  <td className="px-6 text-sm">{p.nombre}</td>
                  <td className="px-10 py-4 text-slate-500 text-sm">
                    {p.descripcion}
                  </td>
                  <td className="text-blue-500 font-bold">{p.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-md border border-slate-800 p-2 w-fit mt-16 mx-auto">
            <Link to={"/"} className="">
              Back to Home &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
