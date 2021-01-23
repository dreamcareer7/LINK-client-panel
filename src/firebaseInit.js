import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyBOzQCilsK9Zoey8VsMViXuxiFMHbqv2PU',
  authDomain: 'link-client-panel.firebaseapp.com',
  projectId: 'link-client-panel',
  storageBucket: 'link-client-panel.appspot.com',
  messagingSenderId: '479390988709',
  appId: '1:479390988709:web:6e4ef40dba9176bf63504c',
  measurementId: 'G-VG42VFY5GG',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(firebaseToken => {
        resolve(firebaseToken);
      })
      .catch(err => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise(resolve => {
    messaging.onMessage(payload => {
      resolve(payload);
    });
  });
