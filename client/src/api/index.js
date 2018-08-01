import { firebase } from '../firebase';

export default class Db {
  users = firebase.db.ref('/users/');
  auth = firebase.auth;
  events = firebase.db.ref('/events/');

  addUser = (uid, displayName, email, photoURL) => {
    const user = firebase.db.ref(`/users/${uid}`);
    user.once('value').then(snap => {
      if (!snap.node) {
        this.users.child(uid).set({
          displayName,
          email,
          events: [],
          photoURL,
        });
      }
    });
  };

  addEvent = data => {
    const user = firebase.db.ref(`/users/${data.uid}`);
    const newEventKey = firebase.db.ref('/events').push().key;
    const updates = {};

    user
      .once('value')
      .then(snap => {
        const events = [...(snap.val().events || []), newEventKey];
        return { ...snap.val(), events };
      })
      .then(userData => {
        updates[`/events/${newEventKey}`] = data;
        updates[`/users/${data.uid}`] = userData;
        firebase.db.ref().update(updates);
      });
  };
  getEventsList = () =>
    Promise.resolve(
      this.events.once('value').then(snap => ({ ...snap.val() })),
    );

  signTo = (route, cb) => {
    firebase.db.ref(route).on('value', cb);
  };
}
