module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    // host: "localhost",
    proxy: {
      "/": {
        target: "https://assignment3-2-gal.herokuapp.com",
        // target: "http://localhost:8008",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
