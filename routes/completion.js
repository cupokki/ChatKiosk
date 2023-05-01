const express = require('express');
const router = express.Router();

const completionService = require("../services/completionService");

router.route("/").post(completionService.getCompletion);

module.exports = router;
