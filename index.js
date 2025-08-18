// const { Client, GatewayIntentBits, Events } = require('discord.js');
// const express = require('express');
// require('dotenv').config(); // load .env

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Bot is running!');
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// // Load bad words and replies
// let badWords = require("./list-bad-word.json");
// let msgs = require("./list-msg.json");

// // Create client with intents
// const client = new Client({
//   intents: [
//     //GatewayIntentBits.Guilds,
//     //GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent
//   ]
// });

// // Bot ready
// client.once(Events.ClientReady, () => {
//   console.log(`✅ Logged in as ${client.user.tag}`);
// });

// // Message event (new syntax)
// client.on(Events.MessageCreate, (msg) => {
//   try {
//     if (msg.author.bot) return; // ignore other bots

//     let chatClient = msg.content.toLowerCase().split(' ');

//     for (let word of chatClient) {
//       if (badWords.id.includes(word)) {
//         msg.reply(msgs.id[Math.floor(Math.random() * msgs.id.length)]);
//         break;
//       }

//       if (badWords.en.includes(word)) {
//         msg.reply(msgs.en[Math.floor(Math.random() * msgs.en.length)]);
//         break;
//       }
//     }

//   } catch (err) {
//     msg.channel.send("⚠️ Error: " + err.message);
//   }
// });

// // Error handler
// client.on("error", (err) => {
//   console.error(err);
// });

// // Login
// client.login(process.env.DISCORD_TOKEN);
require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const express = require('express');

// --- Express Server for Uptime ---
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bot is online and running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// --- Load Word Lists and Replies ---
const badWords = require("./list-bad-word.json");
const sensitiveWords = require("./list-sensitive-word.json");
const msgs = require("./list-msg.json");

// --- Prepare Word Sets for Efficient Lookup ---
const englishBadWords = new Set(badWords.en);
const indonesianBadWords = new Set(badWords.id);
const allSensitiveWords = new Set(sensitiveWords.data);

// --- Discord Client Setup ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// --- Bot Ready Event ---
client.once(Events.ClientReady, () => {
  console.log(`✅ Successfully logged in as ${client.user.tag}`);
});

// --- Message Creation Event Handler ---
client.on(Events.MessageCreate, (msg) => {
  if (msg.author.bot) return;
  const words = msg.content.toLowerCase().split(/\s+/);
  for (const word of words) {
    if (englishBadWords.has(word)) {
      const reply = msgs.en[Math.floor(Math.random() * msgs.en.length)];
      msg.reply(reply);
      return;
    }
    if (indonesianBadWords.has(word) || allSensitiveWords.has(word)) {
      const reply = msgs.id[Math.floor(Math.random() * msgs.id.length)];
      msg.reply(reply);
      return;
    }
  }
});

// --- Error Handling ---
client.on("error", (err) => {
  console.error("A Discord client error occurred:", err);
});

// --- Bot Login ---
// THIS IS THE NEW DEBUGGING LINE:
console.log(`[DEBUG] Attempting to log in with token starting with: ${process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN.substring(0, 5) : 'undefined'}`);
client.login(process.env.DISCORD_TOKEN);
