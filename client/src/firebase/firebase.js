import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import config from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const google = new firebase.auth.GoogleAuthProvider();
export const db = firebase.database();
export const storage = firebase.storage();
