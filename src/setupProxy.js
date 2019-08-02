const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/hk/rss/topgrossingapplications/limit=10/json', { target: 'https://itunes.apple.com' }));
    app.use(proxy('/hk/rss/topgrossingapplications/limit=10/json', { target: 'https://itunes.apple.com' }));
    app.use(proxy('/hk/lookup', { target: 'https://itunes.apple.com' }));
};