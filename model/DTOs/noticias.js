function noticiaDTO(noticia, _id, fyh) {
  return {
    ...noticia,
    _id: _id + "", //id to string
    fyh,
  };
}

export default noticiaDTO;
