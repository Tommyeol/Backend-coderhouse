import express from "express";
const router = express.Router();

import newsController from "../controlador/news.js";

class RouterNews {
  constructor() {
    this.newsController = new newsController();
  }

  start() {
    router.get("/:id?", this.newsController.newsGet);
    router.post("/", this.newsController.newsSave);
    router.put("/:id", this.newsController.newsUpdate);
    router.delete("/:id", this.newsController.newsDelete);

    return router;
  }
}

export default RouterNews;
