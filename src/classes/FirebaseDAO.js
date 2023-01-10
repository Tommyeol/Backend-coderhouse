import admin from "firebase-admin";

/* admin.initializeApp({
  credential: admin.credential.cert(),
});

const db = admin.firestore(); */

class FirebaseDAO {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async getById(id) {
    // Does not work
    try {
      const doc = await this.collection.where("id", "==", id).get();
      if (doc.empty) {
        return false; // Element not found
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    try {
      const result = [];
      const snapshot = await this.collection.get();
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      if (result.length > 0) {
        return result;
      } else {
        return false; // Elements not found
      }
    } catch (err) {
      return err;
    }
  }

  async deleteById(id) {
    try {
      const element = await this.getById(id);
      if (element === false) {
        return false; // Element not found
      } else {
        const data = await this.getAll();
        if (data === false) {
          return null; // Elements not found
        } else {
          const doc = await this.collection.doc(id).delete();
          if (doc.empty) {
            return false;
          } else {
            return doc;
          }
        }
      }
    } catch (err) {
      return err;
    }
  }
}

export default FirebaseDAO;
