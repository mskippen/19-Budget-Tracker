if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("Service Worker Registered"))
        .catch(err => console.log("error registering service worker"))
    })
}