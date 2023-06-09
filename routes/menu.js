const express = require('express');
const router = express.Router();

const menuService = require("../services/menuService");


router.route("/:shop_id").get(menuService.getMenu);

module.exports = router;
