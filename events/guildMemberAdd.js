const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",

  async execute(member) {

    const WELCOME_CHANNEL_ID = "1460378871839854696";

    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) return;


    channel.send({
  "content": `Welcome ${member} to the <:LAFD:1460112476367487204> **Los Angeles Fire Department**. You are member **${member.guild.memberCount}**.`
});

  }
};