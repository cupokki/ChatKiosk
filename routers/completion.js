const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User Index');
});

router.get('/:userId', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});

module.exports = router;
