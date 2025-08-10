const router = require('express').Router();
const svc = require('../services/user.service');

router.post('/', async (req, res, next) => {
  /* #swagger.tags = ['Users'] */
  try {
    const { customer_id, username, status } = req.body;
    const user = await svc.createUser({ customer_id, username, status });
    res.status(201).json(user);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  /* #swagger.tags = ['Users'] */
  try {
    const user = await svc.getUserById(+req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (e) { next(e); }
});

router.get('/', async (req, res, next) => {
  /* #swagger.tags = ['Users'] */
  try {
    const users = await svc.listUsers();
    res.json(users);
  } catch (e) { next(e); }
});

module.exports = router;