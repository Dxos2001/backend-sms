require('dotenv').config();
const { getDataSource } = require('./src/data-source');
getDataSource().catch(err => {
  console.error('[TypeORM] No se pudo inicializar:', err);
  process.exit(1);
});

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

const errorHandler = require('./src/middlewares/error.middleware');
const campaignsRoutes = require('./src/routes/campaign.routes');
const messagesRoutes = require('./src/routes/message.routes');
const customersRoutes = require('./src/routes/customer.routes');
const userRoutes = require('./src/routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/campaigns', campaignsRoutes);
app.use('/messages', messagesRoutes);
app.use('/customers', customersRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

module.exports = app; // 👈 importante