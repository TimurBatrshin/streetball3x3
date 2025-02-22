const pkg = require('./package.json')

module.exports = {
  apiPath: 'stubs/server.js',
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`
    }
  },
  
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    'main': '/streetball3x3',
    'streetball3x3.main': '/',
    'streetball3x3.players': '/players',
    'streetball3x3.tournaments': '/tournaments'
    // 'streetball3x3.main': '/',
    // 'streetball3x3.main': '/'
    // 'link.streetball3x3.auth': '/auth'
  },
  features: {
    'streetball3x3': {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "baseUrl": "/",
    'streetball3x3.api': '/'
  }
}
