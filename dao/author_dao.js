const authors = [];
let incrementalAuthor = 0;

const getAuthors = () => authors;

const saveAuthor = (author) => {
  incrementalAuthor++;
  author.id = incrementalAuthor;
  authors.push(author);

  return author;
};

module.exports = {
  getAuthors,
  saveAuthor,
};
