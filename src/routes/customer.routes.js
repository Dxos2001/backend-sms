const router = require('express').Router();
const svc = require('../services/customer.service');

router.post('/', async (req, res, next) => {
    /* #swagger.tags = ['Customers'] */
  try {
    const {name, status} = req.body;
    const customer = await svc.createCustomer({ name, status });
    res.status(201).json(customer);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
    /* #swagger.tags = ['Customers'] */
  try {
    const customer = await svc.getCustomerById(+req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (e) { next(e); }
});

router.get('/', async (req, res, next) => {
    /* #swagger.tags = ['Customers'] */
  try {
    const customers = await svc.listCustomers();
    res.json(customers);
  } catch (e) { next(e); }
});

module.exports = router;