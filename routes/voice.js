const express = require('express');
const router = express.Router();

const voiceService = require("../services/voiceService");

router.route("/stt").get(voiceService.stt);
router.route("/tts").get(voiceService.tts);

module.exports = router;
