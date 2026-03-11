const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Send a message with the bot.")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Input the message for the bot to send.")
        .setRequired(true)
    ),

  async execute(interaction) {

    const REQUIRED_ROLE_ID = "1460118948891852800"
        if (
      !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply({
        content: "<:xMark:1480446157254688850> You do **not** have **permission** to use this command.",
        ephemeral: true})

    }

    const message = interaction.options.getString("message");

    await interaction.reply({
      content: "<:check:1480446183997571296> **Successfully** sent message.",
      ephemeral: true
    });

    await interaction.channel.send(message);

  }

};