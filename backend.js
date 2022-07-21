class User {
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

const user = new User(
  "Tommy",
  "Vercetti",
  [{ name: "the neverending story", author: "michael ende" }],
  ["sparks the dog", "joe the cangaroo"]
);

console.log("Full name", user.getUserName());
console.log("List previous book names", user.getBookTitles());
user.addBook("momo", "michael ende");
user.addBook("jim button and luke the engine driver", "michael ende");
console.log("List subsequent book names", user.getBookTitles());
console.log("Count the pets", user.countPets());
user.addPets("nemo the fish");
console.log("Total pets", user.countPets());
