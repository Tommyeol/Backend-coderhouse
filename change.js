import express from "express";
import container from "./container.js";

const router = express.Router();
const products = new container("./tp4/products.json");

router.get("/change/:id", async (req, res) => {
  const id = req.params.id;
  const oldValues = await products.getById(parseInt(id));
  if (oldValues) {
    res.send(`
        <div style="display:flex; justify-content: center; flex-direction: column;">
                     <h1>Send product</h1>
                     <div>
                        <form action="/api/products/${id}" method="post">
                            <label>name: <input type="text" id="title" name="title" require value=${oldValues.product} /></label>
                            <label>price: <input type="text" name="price" value=${oldValues.price}></label>
                            <label>thumbnail: <input type="text" name="thumbnail" value=${oldValues.thumbnail}></label>
                            <input type="hidden" id="id" name="id" value="${id}" />
                            <input type="submit" value="Submit">
                        </form>
                    </div>
        </div>`);
  } else {
    res.send(
      '<div style="display:flex; justify-content: center; flex-direction: column;"><h1></h1>There is no Id for such object</h1></div>'
    );
  }
});

export { router as changeRouter };
