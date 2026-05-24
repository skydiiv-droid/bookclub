// 책모임 PWA - 백그라운드 푸시 수신 서비스 워커
// 이 파일은 반드시 사이트 루트(index.html과 같은 위치)에 있어야 합니다.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA8d-HUgdShkvh8-9p6ZO93nRHXY7dpbBo",
  authDomain: "bookclub-6b198.firebaseapp.com",
  projectId: "bookclub-6b198",
  storageBucket: "bookclub-6b198.firebasestorage.app",
  messagingSenderId: "941341633308",
  appId: "1:941341633308:web:c489266e57f3385c94e8d9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) ||
                (payload.data && payload.data.title) || '책모임';
  const options = {
    body: (payload.notification && payload.notification.body) ||
          (payload.data && payload.data.body) || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

// 알림 클릭 시 앱 열기
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
