module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: '"https://assignment3-2-gal.herokuapp.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
