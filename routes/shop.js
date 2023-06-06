const express = require('express');
const router = express.Router();

const menuApiService = require("../services/menuApiService");

router.route("/").get(menuApiService.getMenu);

module.exports = router;
