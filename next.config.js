/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  images: {
    path: 'https://dummyimage.com',
  },
  env: {
    NAME: process.env.NAME,
    MOBILE_NO: process.env.MOBILE_NO,
    SHEET: process.env.SHEET,
    PRODUCT: process.env.PRODUCT,
    CONTACT: process.env.CONTACT,
  }
}