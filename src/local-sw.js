export default function LocalServiceWorkerRegister() {
    const swPath = `${process.env.PUBLIC_URL}/pushWorker.js`;
    if ('serviceWorker' in navigator ) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register(swPath, {
                scope: "/"
            }).then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}

//&& process.env.NODE_ENV == 'production'