// handler.js
const serverless = require('serverless-http');
const app = require('./app');

module.exports.handler = serverless(app, {
  // opcional: normaliza body cuando uses httpApi v2 + offline
  request: (req, event) => {
    if ((!req.body || Object.keys(req.body).length === 0) && event && event.body) {
      try { req.body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body; } catch {}
    }
  }
});