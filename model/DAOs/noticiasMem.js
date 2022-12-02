import noticiaDTO from "../DTOs/noticias.js";
import NoticiasBaseDAO from "./noticias.js";

class NoticiasMemFileDAO extends NoticiasBaseDAO {
  constructor() {
    super();
    this.noticias = [];
  }

  newsGet = async (_id) => {
    try {
      if (_id) {
        let index = this.noticias.findIndex((noticia) => noticia._id == _id);
        return index >= 0 ? [this.noticias[index]] : [];
      } else {
        return this.noticias;
      }
    } catch (error) {
      console.log("error newsGet", error);
      return [];
    }
  };

  newsSave = async (noticia) => {
    try {
      let _id = this.getNext_Id(this.noticias);
      let fyh = new Date().toLocaleString();
      let noticiaGuardada = noticiaDTO(noticia, _id, fyh);
      this.noticias.push(noticiaGuardada);

      return noticiaGuardada;
    } catch (error) {
      console.log("error newsSave:", error);
      let noticia = {};

      return noticia;
    }
  };

  newsUpdate = async (_id, noticia) => {
    try {
      let fyh = new Date().toLocaleString();
      let noticiaNew = noticiaDTO(noticia, _id, fyh);

      let indice = this.getIndex(_id, this.noticias);
      let noticiaActual = this.noticias[indice] || {};

      let noticiaActualizada = { ...noticiaActual, ...noticiaNew };

      indice >= 0
        ? this.noticias.splice(indice, 1, noticiaActualizada)
        : this.noticias.push(noticiaActualizada);

      return noticiaActualizada;
    } catch (error) {
      console.log("error newsUpdate:", error);
      let noticia = {};

      return noticia;
    }
  };

  newsDelete = async (_id) => {
    try {
      let indice = this.getIndex(_id, this.noticias);
      let noticiaBorrada = this.noticias.splice(indice, 1)[0];

      return noticiaBorrada;
    } catch (error) {
      console.log("error newsDelete:", error);
      let noticia = {};

      return noticia;
    }
  };
}

export default NoticiasMemFileDAO;
