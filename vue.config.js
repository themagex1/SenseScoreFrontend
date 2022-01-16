module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: "https://localhost:5001",
      }
    }
  }
}
