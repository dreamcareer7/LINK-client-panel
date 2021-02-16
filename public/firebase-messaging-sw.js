// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyBOzQCilsK9Zoey8VsMViXuxiFMHbqv2PU',
  authDomain: 'link-client-panel.firebaseapp.com',
  projectId: 'link-client-panel',
  storageBucket: 'link-client-panel.appspot.com',
  messagingSenderId: '479390988709',
  appId: '1:479390988709:web:6e4ef40dba9176bf63504c',
  measurementId: 'G-VG42VFY5GG',
}; // <-- Dev
// const firebaseConfig = {
//   apiKey: "AIzaSyAnLbY-rRXvpnYuK0Ehk0BcCfeNwVZgOjw",
//   authDomain: "jayla-firebase.firebaseapp.com",
//   projectId: "jayla-firebase",
//   storageBucket: "jayla-firebase.appspot.com",
//   messagingSenderId: "395971076915",
//   appId: "1:395971076915:web:e63cbe28f34703dbbe5446",
//   measurementId: "G-NXY98HGT9V"
// }; // <-- Production + Client Staging

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
