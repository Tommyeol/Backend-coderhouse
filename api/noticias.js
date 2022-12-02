import config from "../config.js";
import NoticiasFactoryDAO from "../model/DAOs/noticiasFactory.js";
import Noticias from "../model/models/noticias.js";

class ApiNews {
  constructor() {
    this.noticiasDAO = NoticiasFactoryDAO.get(config.TIPO_PERSISTENCIA);
  }

  async newsGet(id) {
    return await this.noticiasDAO.newsGet(id);
  }

  async newsSave(noticia) {
    ApiNews.asegurarNoticiaValida(noticia, true);
    return await this.noticiasDAO.newsSave(noticia);
  }

  async newsUpdate(id, noticia) {
    ApiNews.asegurarNoticiaValida(noticia, false);
    return await this.noticiasDAO.newsUpdate(id, noticia);
  }

  async newsDelete(id) {
    return await this.noticiasDAO.newsDelete(id);
  }

  static asegurarNoticiaValida(noticia, requerido) {
    try {
      Noticias.validar(noticia, requerido);
    } catch (error) {
      throw new Error(
        "The news is missing some data " + error.details[0].message
      );
    }
  }
}

export default ApiNews;
