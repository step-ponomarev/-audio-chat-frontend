module.exports = {
  devServer: {
    port: 8081
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: require.resolve('janus-gateway'),
          loader: 'exports-loader',
          options: {
            exports: 'Janus',
          },
        }
      ]
    }
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },

  transpileDependencies: [
    'quasar'
  ]
}
