const path = require("path");

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/components/"),
      '@pages': path.resolve(__dirname, "src/pages/"),
      '@templates': path.resolve(__dirname, "src/templates/"),
      '@assets': path.resolve(__dirname, "src/assets/"),
      '@plugins': path.resolve(__dirname, "src/plugins/"),
      '@reducers': path.resolve(__dirname, "src/reducers/"),
      '@src': path.resolve(__dirname, "src/"),
    }
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
