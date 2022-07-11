class userNew {
  constructor(name, lastName, books, pets) {
    this.name = name;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
  }
  getUserName() {
    return `${this.name} ${this.lastName}`;
  }
  addBook(name, author) {
    this.books.push({ name, author });
  }
  addPets(pet) {
    this.pets.push(pet);
  }
  countPets() {
    return this.pets.length;
  }
  getBookTitles() {
    return this.books.map((book) => book.name);
  }
}

const user = new userNew(
  "Tommy",
  "Vercetti",
  [{ name: "the neverending story", author: "michael ende" }],
  ["sparks the dog", "joe the cangaroo"]
);

console.log("Full name", userNew.getUserName());
console.log("List previous book names", user.getBookTitles());
userNew.addBook("momo", "michael ende");
userNew.addBook("jim button and luke the engine driver", "michael ende");
console.log("List subsequent book names", user.getBookTitles());
console.log("Count the pets", userNew.countPets());
userNew.addPets("nemo the fish");
console.log("Total pets", userNew.countPets());
