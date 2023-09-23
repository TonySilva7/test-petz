/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL_LOCAL: 'http://localhost:3000/api/scheduling',
    API_URL_POKEMON: 'https://pokeapi.co/api/v2',
  },
};

module.exports = nextConfig;
