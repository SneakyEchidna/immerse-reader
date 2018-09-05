import { firebase } from '../firebase';

export default class Db {
  users = firebase.db.ref('/users/');

  auth = firebase.auth;

  wordlists = firebase.db.ref('/wordlists/');

  addUser = (uid, displayName, email, photoURL) => {
    const user = firebase.db.ref(`/users/${uid}`);
    user.once('value').then(snap => {
      if (!snap.node) {
        this.users.child(uid).set({
          displayName,
          email,
          photoURL
        });
      }
    });
  };

  addWord = (uid, word, definitions) => {
    firebase.db.ref(`/wordlists/${uid}/${word}`).set(definitions);
  };

  getWordList = uid =>
    Promise.resolve(
      firebase.db
        .ref(`/wordlists/${uid}`)
        .once('value')
        .then(snap => snap.val())
    );

  signTo = (route, cb) => {
    firebase.db.ref(route).on('value', cb);
  };
}

export class Storage {
  addBook = (uid, { name, author, file }) => {
    firebase.storage
      .ref(`/books/${uid}/${name}_${author}.epub`)
      .put(file)

      .then(() =>
        firebase.db
          .ref(`/users/${uid}/books/${name}_${author}`)
          .set({ name, author })
      );
  };

  getBooks = uid =>
    firebase.db
      .ref(`/users/${uid}/books`)
      .once('value')
      .then(snap => snap.val() || {});

  getBook = (uid, name) =>
    firebase.storage
      .ref(`/books/${uid}/${name}.epub`)
      .getDownloadURL()
      .catch(error => {
        // Handle any errors
        console.log(error);
      });

  deleteBook = (uid, key) => {
    firebase.storage
      .ref(`/books/${uid}/${key}.epub`)
      .delete()
      .then(() => firebase.db.ref(`/users/${uid}/books/${key}`).delete())
      .catch(e => console.log(e));
  };
}
