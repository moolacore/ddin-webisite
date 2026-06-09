const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://core-api.ddin.rw',
      changeOrigin: true,
      secure: true,
      on: {
        proxyReq: (proxyReq) => {
          proxyReq.setHeader('X-API-key', '156n7LEdNnMfbAGDCZvKL4Or8bdH4zzO');
        },
      },
    })
  );
};