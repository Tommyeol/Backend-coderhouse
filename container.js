const fs = require("fs");

class container {
  constructor(list) {
    this.list = list;
  }

  async getAll() {
    try {
      let dataArch = await fs.promises.readFile(this.list, "utf8");
      let dataArchParse = JSON.parse(dataArch);
      if (dataArchParse.length) {
        console.log(dataArchParse);
      } else {
        console.log("There is no products");
      }
      console.log(dataArchParse);
    } catch (error) {
      console.log(error);
    }
  }
  async randomItem() {
    try {
      let dataArch = await fs.promises.readFile(this.list, "utf8");
      let dataArchParse = JSON.parse(dataArch);
      let randomItem =
        dataArchParse[Math.floor(Math.random() * dataArchParse.length)];
      console.log(dataArchParse);
    } catch (error) {
      console.log(error);
    }
  }
}

export default container;
