const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.sightlinks.org',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/api'
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
  
  app.use(
    '/web',
    createProxyMiddleware({
      target: 'http://api.sightlinks.org',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/web': '/web'
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
  
  app.use(
    '/download',
    createProxyMiddleware({
      target: 'http://api.sightlinks.org',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/download': '/download'
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
}; 