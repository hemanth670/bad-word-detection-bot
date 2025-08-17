
// const Discord = require('discord.js');
// const client = new Discord.Client();
// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Bot is running!');
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
// let badWords = require("./list-bad-word.json")
// let msgs = require("./list-msg.json")


// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('message', msg => {
//   try {
//     let chatClient = msg.content.toLocaleLowerCase()
//     chatClient = chatClient.split(' ')
//     for (let index = 0; index < chatClient.length; index++) {
//       const element = chatClient[index];

//       if (badWords.id.includes(element)) {
//         msg.reply(msgs.id[Math.floor(Math.random() * msgs.id.length)])
//         break;
//       }

//       if (badWords.en.includes(element.toLocaleLowerCase())) {
//         msg.reply(msgs.en[Math.floor(Math.random() * msgs.en.length)])
//         break;
//       }

//     }


//   } catch (err) {
//     msg.channel.send("aku error om. msg : " + err)
//   }

// });

// client.on("error", (err) => {
//   console.error(err)
// })

// client.login(process.env.DISCORD_TOKEN);
// For loading the secret token from the environment
require('dotenv').config(); 

// For creating a web server to keep the bot online 24/7
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bot is online!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// --- Your Original Bot Code Starts Here ---

const Discord = require('discord.js');
// It's good practice to specify intents for newer discord.js versions
const client = new Discord.Client(); 
let badWords = require("./list-bad-word.json");
let msgs = require("./list-msg.json");


// Event handler for when the bot is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// Event handler for new messages
client.on('message', msg => {
  // Ignore messages from other bots to prevent loops
  if (msg.author.bot) return;

  try {
    const chatContent = msg.content.toLowerCase();
    const words = chatContent.split(' ');

    for (const element of words) {
      // Check for Indonesian bad words
      if (badWords.id.includes(element)) {
        msg.reply(msgs.id[Math.floor(Math.random() * msgs.id.length)]);
        return; // Exit after finding one bad word
      }

      // Check for English bad words
      if (badWords.en.includes(element)) {
        msg.reply(msgs.en[Math.floor(Math.random() * msgs.en.length)]);
        return; // Exit after finding one bad word
      }
    }
  } catch (err) {
    // Log errors privately instead of sending them to the channel
    console.error("An error occurred while processing a message:", err);
  }
});


// Event handler for client errors
client.on("error", (err) => {
  console.error("Discord Client Error:", err);
});


// Login to Discord using the token from your environment variables
client.login(process.env.DISCORD_TOKEN);



