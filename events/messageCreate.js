const PREFIX = "-";

module.exports = {
  name: "messageCreate",

  async execute(message, client) {

    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(cmdName);
    if (!command) return;

    try {

      await command.execute(message, args, client);

    } catch (error) {

      console.error(error);

    }

  }
};