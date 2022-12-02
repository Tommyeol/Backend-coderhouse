import fs from "fs";
import noticiaDTO from "../DTOs/noticias.js";
import NoticiasBaseDAO from "./noticias.js";

class NoticiasFileDAO extends NoticiasBaseDAO {
  constructor(nombreArchivo) {
    super();
    this.nombreArchivo = nombreArchivo;
  }

  async leer(archivo) {
    return JSON.parse(await fs.promises.readFile(archivo, "utf-8"));
  }

  async guardar(archivo, noticias) {
    await fs.promises.writeFile(archivo, JSON.stringify(noticias, null, "\t"));
  }

  newsGet = async (_id) => {
    try {
      if (_id) {
        let noticias = await this.leer(this.nombreArchivo);
        let index = noticias.findIndex((noticia) => noticia._id == _id);

        return index >= 0 ? [noticias[index]] : [];
      } else {
        let noticias = await this.leer(this.nombreArchivo);
        return noticias;
      }
    } catch (error) {
      console.log("error newsGet:", error);
      let noticias = [];

      //Save file
      await this.guardar(this.nombreArchivo, noticias);
      return noticias;
    }
  };

  newsSave = async (noticia) => {
    try {
      //Read file
      let noticias = await this.leer(this.nombreArchivo);

      let _id = this.getNext_Id(noticias);
      let fyh = new Date().toLocaleString();
      let noticiaGuardada = noticiaDTO(noticia, _id, fyh);
      noticias.push(noticiaGuardada);

      //Save file
      await this.guardar(this.nombreArchivo, noticias);

      return noticiaGuardada;
    } catch (error) {
      console.log("error newsSave:", error);
      let noticia = {};

      return noticia;
    }
  };

  newsUpdate = async (_id, noticia) => {
    try {
      //Read file
      let noticias = await this.leer(this.nombreArchivo);

      let fyh = new Date().toLocaleString();
      let noticiaNew = noticiaDTO(noticia, _id, fyh);

      let indice = this.getIndex(_id, noticias);
      let noticiaActual = noticias[indice] || {};

      let noticiaActualizada = { ...noticiaActual, ...noticiaNew };

      indice >= 0
        ? noticias.splice(indice, 1, noticiaActualizada)
        : noticias.push(noticiaActualizada);

      //Save file
      await this.guardar(this.nombreArchivo, noticias);

      return noticiaActualizada;
    } catch (error) {
      console.log("error newsUpdate:", error);
      let noticia = {};

      return noticia;
    }
  };

  newsDelete = async (_id) => {
    try {
      //Read file
      let noticias = await this.leer(this.nombreArchivo);

      let indice = this.getIndex(_id, noticias);
      let noticiaBorrada = noticias.splice(indice, 1)[0];

      //Save file
      await this.guardar(this.nombreArchivo, noticias);

      return noticiaBorrada;
    } catch (error) {
      console.log("error newsDelete:", error);
      let noticia = {};

      return noticia;
    }
  };
}

export default NoticiasFileDAO;
