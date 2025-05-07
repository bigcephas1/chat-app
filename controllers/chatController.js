const Message = require('../models/message');

// Get all chat messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('user', 'username');
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
