console.log("Service Worker Loaded...");

window.self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  window.self.registration.showNotification(data.title, {
    body: "Notified by Traversy Media!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});