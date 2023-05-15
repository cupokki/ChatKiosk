const express = require('express');
const router = express.Router();

const completionService = require("../services/completionService");

router.route("/").post(completionService.createOrderCompletion);
router.route("/new-session").post(completionService.createOrderSession);
router.route("/test").post(completionService.test);
// router.route("/").delete(completionService.terminateCompletion);

module.exports = router;
