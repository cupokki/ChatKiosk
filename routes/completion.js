const express = require('express');
const router = express.Router();

const completionService = require("../services/completionService");

// router.route("/").post(completionService.createOrder);
router.route("/").post(completionService.getOrderRelpy);
// router.route("/").post(completionService.terminateCompletion);

module.exports = router;
