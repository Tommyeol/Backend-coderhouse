import MessagesMongoDB from "../db/message.js";

import { normalize, schema, denormalize } from "normalizr";
import util from "util";

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });

const schemaMessage = new schema.Entity(
  "post",
  {
    author: schemaAuthor,
  },
  { idAttribute: "_id" }
);

const schemaMessages = new schema.Entity(
  "posts",
  {
    messages: [schemaMessage],
  },
  { idAttribute: "id" }
);
/* ---------------------------------------------------------------------------- */

class Messages {
  constructor() {
    this.messagesMongoDB = new messagesMongoDB();
  }

  async getAll() {
    try {
      let messages = await this.messagesMongoDB.leer();
      let messagesConId = {
        id: "messages",
        messages: messages.map((message) => ({ ...message._doc })),
      };
      let messagesConIdN = normalize(messagesConId, schemaMessages);
      return messagesConIdN;
    } catch {
      return [];
    }
  }

  async guardar(message) {
    try {
      message.fyh = new Date().toLocaleString();
      await this.messagesMongoDB.guardar(message);
    } catch (error) {
      console.log("Error saving message", error);
    }
  }
}

export default Messages;
