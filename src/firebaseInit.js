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
}; // <-- Dev
// const config = {
//     apiKey: "AIzaSyAnLbY-rRXvpnYuK0Ehk0BcCfeNwVZgOjw",
//     authDomain: "jayla-firebase.firebaseapp.com",
//     projectId: "jayla-firebase",
//     storageBucket: "jayla-firebase.appspot.com",
//     messagingSenderId: "395971076915",
//     appId: "1:395971076915:web:e63cbe28f34703dbbe5446",
//     measurementId: "G-NXY98HGT9V"
// }; // <-- Production + Client Staging

firebase.initializeApp(config);
export const firebaseMessagingInstance = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    firebaseMessagingInstance
      .requestPermission()
      .then(() => firebaseMessagingInstance.getToken())
      .then(firebaseToken => {
        resolve(firebaseToken);
      })
      .catch(err => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise(resolve => {
    firebaseMessagingInstance.onMessage(payload => {
      resolve(payload);
    });
  });
