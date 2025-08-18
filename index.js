const { Client, GatewayIntentBits, Events } = require('discord.js');
const express = require('express');
require('dotenv').config(); // load .env

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Load bad words and replies
let badWords = require("./list-bad-word.json");
let msgs = require("./list-msg.json");

// Create client with intents
const client = new Client({
  intents: [
    //GatewayIntentBits.Guilds,
    //GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot ready
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Message event (new syntax)
client.on(Events.MessageCreate, (msg) => {
  try {
    if (msg.author.bot) return; // ignore other bots

    let chatClient = msg.content.toLowerCase().split(' ');

    for (let word of chatClient) {
      if (badWords.id.includes(word)) {
        msg.reply(msgs.id[Math.floor(Math.random() * msgs.id.length)]);
        break;
      }

      if (badWords.en.includes(word)) {
        msg.reply(msgs.en[Math.floor(Math.random() * msgs.en.length)]);
        break;
      }
    }

  } catch (err) {
    msg.channel.send("⚠️ Error: " + err.message);
  }
});

// Error handler
client.on("error", (err) => {
  console.error(err);
});

// Login
client.login(process.env.DISCORD_TOKEN);
// index.js
// require('dotenv').config(); // Load .env
// const { Client, GatewayIntentBits, Events } = require('discord.js');
// const express = require('express');

// // ------------------- Express server to keep bot online -------------------
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Bot is running!');
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// // ------------------- Load bad words and replies -------------------
// const badWords = require("./list-bad-word.json");
// const msgs = require("./list-msg.json");

// // ------------------- Create Discord client -------------------
// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent
//   ]
// });

// // ------------------- Bot ready event -------------------
// client.once(Events.ClientReady, () => {
//   console.log(`✅ Logged in as ${client.user.tag}`);
// });

// // ------------------- Message handler -------------------
// client.on(Events.MessageCreate, (msg) => {
//   if (msg.author.bot) return; // Ignore bot messages

//   const words = msg.content.toLowerCase().split(/\s+/); // split by spaces

//   for (const word of words) {
//     // Check Indonesian bad words
//     if (badWords.id.includes(word)) {
//       msg.reply(msgs.id[Math.floor(Math.random() * msgs.id.length)]);
//       break;
//     }

//     // Check English bad words
//     if (badWords.en.includes(word)) {
//       msg.reply(msgs.en[Math.floor(Math.random() * msgs.en.length)]);
//       break;
//     }
//   }
// });

// // ------------------- Error logging -------------------
// client.on("error", (err) => {
//   console.error("Discord client error:", err);
// });

// // ------------------- Login with token -------------------
// client.login(process.env.DISCORD_TOKEN);
