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
          photoURL,
        });
      }
    });
  };

  // addWord = (uid, word) => {
  //   const user = firebase.db.ref(`/users/${uid}`);
  //   const updates = {};

  //   user
  //     .once('value')
  //     .then(snap => {
  //       const events = [...(snap.val().events || []), newEventKey];
  //       return { ...snap.val(), events };
  //     })
  //     .then(userData => {
  //       updates[`/events/${newEventKey}`] = data;
  //       updates[`/users/${data.uid}`] = userData;
  //       firebase.db.ref().update(updates);
  //     });
  // };
  addWord = (uid, word, definitions) => {
    firebase.db.ref(`/wordlists/${uid}/${word}`).set(definitions);
  };
  getWordList = uid =>
    Promise.resolve(
      firebase.db
        .ref(`/wordlists/${uid}`)
        .once('value')
        .then(snap => {
          return snap.val();
        }),
    );

  signTo = (route, cb) => {
    firebase.db.ref(route).on('value', cb);
  };
}
