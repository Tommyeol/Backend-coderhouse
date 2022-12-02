import ApiNews from "../api/noticias.js";

class newsController {
  constructor() {
    this.apiNews = new ApiNews();
  }

  newsGet = async (req, res) => {
    try {
      let id = req.params.id;
      //console.log(id)
      let Noticias = await this.apiNews.newsGet(id);

      res.send(Noticias);
    } catch (error) {
      console.log("error newsGet", error);
    }
  };

  newsSave = async (req, res) => {
    try {
      let Noticia = req.body;
      //console.log(Noticia)
      let NoticiaGuardada = await this.apiNews.newsSave(Noticia);

      res.json(NoticiaGuardada);
    } catch (error) {
      console.log("error newsGet", error);
    }
  };

  newsUpdate = async (req, res) => {
    try {
      let Noticia = req.body;
      let id = req.params.id;
      //console.log(News)
      let NoticiaActualizada = await this.apiNews.newsUpdate(id, Noticia);
      res.json(NoticiaActualizada);
    } catch (error) {
      console.log("error newsGet", error);
    }
  };

  newsDelete = async (req, res) => {
    try {
      let id = req.params.id;
      let NoticiaBorrada = await this.apiNews.newsDelete(id);
      res.json(NoticiaBorrada);
    } catch (error) {
      console.log("error newsGet", error);
    }
  };
}

export default newsController;
