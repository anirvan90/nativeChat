import firebase, { auth } from "firebase";
import {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket
} from "firebase.config.js";

class Backend {
  uid = "";
  messageRef = null;

  constructor() {
    firebase.initializeApp({
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL: databaseURL,
      storageBucket: storageBucket
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            alert(error.message);
          });
      }
    });
  }

  setUid(value) {
    this.uid = value;
  }

  getUid() {
    return this.uid;
  }

  loadMessages(cb) {
    this.messageRef = firebase.database().ref("messages");
    this.messageRef.off();
    const onReceive = data => {
      const message = data.val();
      cb({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messageRef.limitToLast(20).on("child_added", onReceive);
  }

  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messageRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }

  closeChat() {
    if (this.messageRef) {
      this.messageRef.off();
    }
  }
}

export default new Backend();
