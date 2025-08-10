const app = require('./app');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://${HOST}:${PORT}`);
});