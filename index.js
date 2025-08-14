const Discord = require('discord.js');
const client = new Discord.Client();
let badWords = require("./list-bad-word.json")
let msgs = require("./list-msg.json")


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  try {
    let chatClient = msg.content.toLocaleLowerCase()
    chatClient = chatClient.split(' ')
    for (let index = 0; index < chatClient.length; index++) {
      const element = chatClient[index];

      if (badWords.id.includes(element)) {
        msg.reply(msgs.id[Math.floor(Math.random() * msgs.id.length)])
        break;
      }

      if (badWords.en.includes(element.toLocaleLowerCase())) {
        msg.reply(msgs.en[Math.floor(Math.random() * msgs.en.length)])
        break;
      }

    }


  } catch (err) {
    msg.channel.send("aku error om. msg : " + err)
  }

});

client.on("error", (err) => {
  console.error(err)
})

client.login(process.env.DISCORD_TOKEN);
