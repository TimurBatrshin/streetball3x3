const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
};

config.server = {
  enhanceMiddleware: (middleware, server) => {
    return (req, res, next) => {
      try {
        decodeURI(req.url); // Проверяем, что URI корректный
        middleware(req, res, next);
      } catch (error) {
        console.error(`🚨 Некорректный URI: ${req.url}`);
        res.writeHead(400);
        res.end('Некорректный запрос');
      }
    };
  }
};

module.exports = config;