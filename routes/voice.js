const express = require('express');
const router = express.Router();

const voiceService = require("../services/voiceService");

router.route("/stt").post(voiceService.stt);
router.route("/tts").post(voiceService.tts);

module.exports = router;
