const router = require('express').Router();
const svc = require('../services/campaign.service');

router.post('/', async (req, res, next) => {
  /* #swagger.tags = ['Campaigns'] */
  try {
    const { name, message, recipients } = req.body;
    console.log(name, message, recipients);
    const id = await svc.createCampaign({ name, message, recipients });
    res.status(201).json({ id });
  } catch (e) { next(e); }
});

router.post('/:id/dispatch', async (req, res, next) => {
  /* #swagger.tags = ['Campaigns'] */
  try {
    const out = await svc.dispatchCampaign(+req.params.id);
    res.json(out);
  } catch (e) { next(e); }
});

router.get('/', async (req, res, next) => {
  /* #swagger.tags = ['Campaigns'] */
  try {
    const data = await svc.listCampaigns({ from: req.query.from, to: req.query.to });
    res.json(data);
  } catch (e) { next(e); }
});

router.get('/:id/messages', async (req, res, next) => {
  /* #swagger.tags = ['Campaigns'] */
  try {
    const data = await svc.listCampaignMessages(+req.params.id);
    res.json(data);
  } catch (e) { next(e); }
});

module.exports = router;