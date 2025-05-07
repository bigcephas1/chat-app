const express = require('express');
const { getMessages } = require('../controllers/chatController');
const router = express.Router();

// Chat routes
router.get('/messages', getMessages);

module.exports = router;
