require("dotenv").config();
const fs = require("fs");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.prefixCommands = new Collection();
client.slashCommands = new Collection();

// PREFIX COMMANDS
const prefixFiles = fs.readdirSync("./commands/prefix").filter(f => f.endsWith(".js"));

for (const file of prefixFiles) {
  const cmd = require(`./commands/prefix/${file}`);
  client.prefixCommands.set(cmd.name, cmd);
}

// SLASH COMMANDS
const slashFiles = fs.readdirSync("./commands/slash").filter(f => f.endsWith(".js"));

for (const file of slashFiles) {
  const cmd = require(`./commands/slash/${file}`);
  client.slashCommands.set(cmd.data.name, cmd);
}

// EVENTS
const eventFiles = fs.readdirSync("./events").filter(f => f.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(process.env.TOKEN);