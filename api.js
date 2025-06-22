const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your Telegram bot token from BotFather
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';

// Replace with your chat ID (can be user ID or group/channel ID)
const CHAT_ID = 'YOUR_CHAT_ID';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API endpoint to receive notification requests
app.post('/notify', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing "message" in request body' });
    }

    // Send message to Telegram chat
    await bot.sendMessage(CHAT_ID, message);

    return res.json({ status: 'success', message: 'Notification sent to Telegram' });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return res.status(500).json({ status: 'error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Send POST requests to http://localhost:${PORT}/notify with JSON { "message": "your text" }`);
});
