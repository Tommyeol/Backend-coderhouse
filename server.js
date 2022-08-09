import express from "express";
import { routerProducts } from "./products.js";
import { changeRouter } from "./change.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerProducts);
app.use(changeRouter);
app.all("/", async (req, res) => {
  res.send(`
    <div style="display:flex; justify-content: center; flex-direction: column;">
                 <h1>Send product</h1>
                 <div>
                    <form action="/api/products" method="post">
                        <label>name: <input type="text" id="title" name="title" require /></label>
                        <label>price: <input type="text" name="price"></label>
                        <input type="submit" value="Submit">
                    </form>
                </div>
    </div>`);
});

app.all("*", async (req, res) => {
  res.send(
    '<div style="display:flex; justify-content: center;"><h1>Page not found</h1></div>'
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
