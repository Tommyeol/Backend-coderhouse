import Card from "../card/index";
import "./listofProducts.css";

export default function ListOfProducts({ products }) {
  return (
    <section className="card-container">
      {products.map((prod) => (
        <Card key={prod._id} product={prod} />
      ))}
    </section>
  );
}
