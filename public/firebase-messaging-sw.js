// importScripts('https://www.gstatic.com/firebasejs/5.5.4/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/5.5.4/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "758209820726"
});

const messaging = firebase.messaging();
console.log('window: ', self.registration)
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...  
    // self.releaseEvents
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});