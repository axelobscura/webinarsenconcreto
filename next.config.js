/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['www.webinarsenconcreto.com','www.webinarsenconcreto.com/images/','webinarsenconcreto.com','webinars.webinarsenconcreto.com/images/','webinars.webinarsenconcreto.com'],
  }
}

module.exports = nextConfig
