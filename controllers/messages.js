const Message = require("../models/messages");

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const limit = 30;
    const from = req.params.from;
    const messages = await Message.find({ $or: [{ from: req.body.uid, to: from }, { from: from, to: req.body.uid }] }).sort({ createdAt: -1 }).limit(limit);
    res.status(200).json({ ok: true, messages });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
  try {

    const message = await Message.findById(req.body.uid);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new message
exports.createMessage = async (req, res) => {
  const message = new Message({
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.text = req.body.text || message.text;
    message.sender = req.body.sender || message.sender;
    message.receiver = req.body.receiver || message.receiver;
    message.timestamp = req.body.timestamp || message.timestamp;

    const updatedMessage = await message.save();
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.remove();
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};