
# ApiTelegram

Auto notify Telegram via API using Node.js.

## Description

ApiTelegram is a simple API service built with Node.js that allows you to send notifications to a Telegram chat or channel via HTTP requests. This tool makes it easy to integrate Telegram notifications into your own applications, scripts, or monitoring systems.

## Features

- Send messages to Telegram using a REST API.
- Simple POST endpoint to send notifications.
- Easy to configure with your Telegram Bot Token and Chat ID.
- Lightweight and minimal dependencies.

## Requirements

- Node.js (version 12+ recommended)
- A Telegram Bot Token (from [BotFather](https://t.me/BotFather))
- Telegram Chat ID (user, group, or channel)

## Installation

Clone the repository:

```
git clone https://github.com/Tanto123/ApiTelegram.git
cd ApiTelegram
```

Install dependencies:

```
npm install
```

## Configuration

Edit the source code (e.g., `index.js`) and replace the placeholders:

```
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';
```

## Usage

Start the server:

```
node index.js
```

Send a notification via HTTP POST request:

```
curl -X POST http://localhost:3000/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello from ApiTelegram!"}'
```

You should see the message appear in your Telegram chat.

## API Endpoint

- `POST /notify`

Request body JSON:

```
{
  "message": "Your notification message here"
}
```

Response:

- Success: `{ "status": "success", "message": "Notification sent to Telegram" }`
- Error: `{ "status": "error", "error": "Error message" }`

## Example Code Snippet

```
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
const app = express();

app.use(express.json());

app.post('/notify', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing message' });

  try {
    await bot.sendMessage(CHAT_ID, message);
    res.json({ status: 'success', message: 'Notification sent to Telegram' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('ApiTelegram running on port 3000');
});
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

