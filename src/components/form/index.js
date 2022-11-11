import { useState, useContext } from "react";
import { createProduct } from "../../services/productos";
import { productContext } from "../../context/productContext";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
    code: "",
    picture: "",
  };
  const [newProduct, setNewProduct] = useState(initialValues);
  const [message, setMessage] = useState({ show: false, status: "" });
  const { setProducts } = useContext(productContext);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return navigate("/login");
    }
    console.log("here");
    setNewProduct(initialValues);

    await createProduct(newProduct).then((res) => {
      setMessage({ show: true, status: res.status });
      setTimeout(() => {
        setMessage({ show: false, status: "" });
      }, 5000);

      setProducts((prev) => [...prev, res.nuevoProduct]);
    });
  };

  return (
    <section className="w-11/12 max-w-lg mx-auto shadow-sm px-12 py-10 mt-10 mb-12 bg-white rounded-lg">
      <h4 className="font-bold text-2xl my-5s uppercase">Form</h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 py-5 relative"
      >
        {message.show && (
          <p className="text-lime-600 font-normal  border-lime-500 text-md fixed top-16 right-16 bg-lime-100 rounded-xl px-4 py-3 shadow-xl animate-toastyAnim">
            {message.status}
          </p>
        )}
        <div className="flex flex-col">
          <label htmlFor="product" className="text-gray-600">
            product
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={newProduct.name}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-indigo-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-gray-600">
            description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={newProduct.description}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-indigo-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-gray-600">
            price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            value={newProduct.price}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-indigo-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="text-gray-600">
            stock
          </label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={handleChange}
            value={newProduct.stock}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-indigo-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="code" className="text-gray-600">
            code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            onChange={handleChange}
            value={newProduct.code}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-indigo-400/40"
          />
        </div>
        <div className="flex flex-col mb-10">
          <label htmlFor="picture" className="text-gray-600">
            picture
          </label>
          <input
            type="text"
            name="picture"
            id="picture"
            onChange={handleChange}
            value={newProduct.picture}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-indigo-400/40"
          />
        </div>
        <button className="bg-indigo-600 text-white font-semibold text-base py-3 rounded-md hover:bg-indigo-500">
          Add product
        </button>
      </form>
    </section>
  );
}
