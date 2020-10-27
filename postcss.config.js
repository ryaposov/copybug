module.exports = (ctx) => {
  return {
    plugins: [
      require('postcss-import')({}),
      require('postcss-nested-ancestors')({}),
      require('postcss-nested')({}),
      require('postcss-preset-env')({
        stage: false,
        features: {
          'custom-media-queries': true,
          'custom-properties': true
        },
        importFrom: [
          './src/css/root-size.css',
          './node_modules/@ryaposov/tokens/custom-variables.css',
          './node_modules/@ryaposov/tokens/custom-media.css'
        ]
      }),
      require('tailwindcss')('./node_modules/@ryaposov/tokens/tailwind.config.js'),
      require('autoprefixer')({}),
      require('postcss-pxtorem')({
        rootValue: 16,
        propList: ['*'],
        mediaQuery: true,
        exclude: './src/css/root-size.css',
      }),
      require('postcss-reporter')({ filter: message => true })
    ]
  }
}
