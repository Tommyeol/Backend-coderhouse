const fs = require("fs");

class Container {
  constructor(list) {
    this.list = list;
  }

  async getAll() {
    try {
      let dataArch = await fs.promises.readFile(this.list, "utf8");
      const dataArchParse = JSON.parse(dataArch);
      // console.log(dataArchParse);
      return dataArchParse;
    } catch (error) {
      console.log(error);
    }
  }
  async randomItem() {
    try {
      let dataArch = await fs.promises.readFile(this.list, `utf8`);
      const dataArchParse = JSON.parse(dataArch);
      let product =
        dataArchParse[Math.floor(Math.random() * dataArchParse.length)];
      // console.log(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;
