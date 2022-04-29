/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

}

module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost', 'loremflickr.com'],
  },
  nextConfig
}


// module.exports = nextConfig
