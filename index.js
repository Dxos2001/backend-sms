const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

const app = express();
app.use(express.json());

// health simple
app.get('/api/health', (req, res) => res.json({ ok: true }));

// routes
const campaignsRoutes = require('./src/routes/campaign.routes');
const messagesRoutes = require('./src/routes/message.routes');
const customersRoutes = require('./src/routes/customer.routes');
const userRoutes = require('./src/routes/user.routes');
app.use('/campaigns', campaignsRoutes);
app.use('/messages', messagesRoutes);
app.use('/customers', customersRoutes);
app.use('/users', userRoutes);

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'));