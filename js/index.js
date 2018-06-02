if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log(`registration successful with scope: ${reg.scope}`))
    .catch(err => console.log(`registration failed: ${err}`));
}
