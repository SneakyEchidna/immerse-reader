const firebase = require('firebase');
const config = require('./config');

firebase.initializeApp(config);
const db = firebase.database();
const ref = db.ref();
const definitionsRef = ref.child('definitions');
const addWordtoStore = (word, def) => {
  definitionsRef.update({ [word]: def });
};
const getWordFromStore = word => definitionsRef
  .child(word)
  .once('value')
  .then((snapshot) => {
    const definitions = snapshot.val();
    return definitions;
  });
module.exports = { addWordtoStore, getWordFromStore };
