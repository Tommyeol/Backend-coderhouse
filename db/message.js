import * as model from "./model.js";

class MessagesMongoDB {
  constructor() {}

  leer() {
    return model.messages.find({});
  }

  guardar(message) {
    const messageModel = new model.messages(message);
    return messageModel.save();
  }
}

export default MessagesMongoDB;
