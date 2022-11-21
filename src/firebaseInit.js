import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAbw0y8qaQHgcmGX_9xwDgrPpfBIa_Gu9o",
  authDomain: "kobe-bsc.firebaseapp.com",
  projectId: "kobe-bsc",
  storageBucket: "kobe-bsc.appspot.com",
  messagingSenderId: "40723834531",
  appId: "1:40723834531:web:b3a39f6150bb0002128116",
  measurementId: "G-XMF3SR8EEN"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestFirebaseNotificationPermission = () =>

  new Promise((resolve, reject) => {
    Notification
      .requestPermission()
      .then((permission) => {
        getToken(
          messaging,
        { vapidKey: "BOnl3ZyQ2iF9mi9bHVR2KeA2coAJxK0t1QO2HKwaurf5e5Do5nFe9o64SBJVMF5IioGOMHEgyO4DjzwX-K74HyM" }
        )
        .then((firebaseToken) => {
          console.log(firebaseToken)
          resolve(firebaseToken);
        })
        .catch((err) => {
          console.log(err)
          reject(err);
        });
    })
      
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
