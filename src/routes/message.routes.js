const router = require('express').Router();

/* #swagger.tags = ['Messages'] */
router.get('/health', (_, res) => res.json({ ok: true }));
module.exports = router;