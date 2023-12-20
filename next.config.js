/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: 'service-worker.js'
})

const nextConfig = withPWA({
  reactStrictMode: true
});

module.exports = nextConfig


/*
module.exports = withPWA({
    reactStrictMode: true, // Agrega reactStrictMode
    pwa: {
        dest: 'public',
        runtimeCaching: [
            {
                urlPattern: /^https?.*\/,
    handler: 'NetworkFirst',
    options: {
    cacheName: 'offlineCache',
        expiration: {
        maxEntries: 200,
    },
},
},
],
},
})
*/