module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
    },
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
};
