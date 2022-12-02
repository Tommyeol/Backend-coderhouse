import Joi from "joi";

class Noticias {
  constructor(titulo, cuerpo, autor, imagen, email, vista) {
    this.titulo = titulo;
    this.cuerpo = cuerpo;
    this.autor = autor;
    this.imagen = imagen;
    this.email = email;
    this.vista = vista;
  }

  equals(otherNews) {
    if (!(otherNews instanceof Noticias)) {
      return false;
    }
    if (this.titulo != otherNews.titulo) {
      return false;
    }
    if (this.cuerpo != otherNews.cuerpo) {
      return false;
    }
    if (this.autor != otherNews.autor) {
      return false;
    }
    if (this.imagen != otherNews.imagen) {
      return false;
    }
    if (this.email != otherNews.email) {
      return false;
    }
    if (this.vista != otherNews.vista) {
      return false;
    }
    return true;
  }

  static validar(noticia, requerido) {
    //console.log(noticia,requerido)
    const NoticiaSchema = Joi.object({
      titulo: requerido ? Joi.string().required() : Joi.string(),
      cuerpo: requerido ? Joi.string().required() : Joi.string(),
      autor: requerido ? Joi.string().required() : Joi.string(),
      imagen: requerido ? Joi.string().required() : Joi.string(),
      email: requerido ? Joi.string().required() : Joi.string(),
      vista: requerido ? Joi.boolean().required() : Joi.boolean(),
    });

    const { error } = NoticiaSchema.validate(noticia);
    if (error) {
      throw error;
    }
  }
}

export default Noticias;
