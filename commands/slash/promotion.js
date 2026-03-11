const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("promote")
    .setDescription("Promote a user.")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Select the user to promote.")
        .setRequired(true)
    )
    .addRoleOption(option =>
        option
        .setName("oldrank")
        .setDescription("Select the user's old rank.")
        .setRequired(true)

    )
    .addRoleOption(option =>
        option
        .setName("newrank")
        .setDescription("Select the user's new rank.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("notes")
        .setDescription("Input notes for the promotion.")
        .setRequired(true)
    ),

  async execute(interaction) {

    const REQUIRED_ROLE_ID = "1460117949770629304"
    const PROMOTION_CHANNEL_ID = "1480442427054493706"
        if (
      !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !interaction.member.permissions.has("Administrator")
    ) {
      return interaction.reply({
        content: "<:xMark:1480446157254688850> You do **not** have **permission** to use this command.",
        ephemeral: true})

    }


    const user = interaction.options.getMember("user");
    const oldrank = interaction.options.getRole("oldrank");
    const newrank = interaction.options.getRole("newrank");
    const notes = interaction.options.getString("notes");

    const channel = interaction.guild.channels.cache.get(PROMOTION_CHANNEL_ID);

    await user.roles.add(newrank);
    await user.roles.remove(oldrank);

if (!channel) {
  return interaction.reply({
    content: "<:xMark:1480446157254688850> Failed to **fetch** promotion channel.",
    ephemeral: true
  });
}

    await interaction.reply({
      content: "<:check:1480446183997571296> **Successfully** issued promotion.",
      ephemeral: true
    });

    channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1480684031094951946/TXRP.png?ex=69b28c36&is=69b13ab6&hm=94652f581d53ac26a4f764b5f2682e4bf45d0f8e14f0795058a59b4be16a3795&=&format=webp&quality=lossless&width=1768&height=606"
              }
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A promotion has been issued by ${interaction.user} to ${user}. Ensure to congratulate the user on their promotion.\n\n**User**: ${user}\n**New Rank**: ${newrank}\n**Notes**: ${notes}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1480598651091812614/TXRP.png?ex=69b2e572&is=69b193f2&hm=ffee8f61382ec4792a35113e163f126d1375e34061805c317920e5d297d73211&=&format=webp&quality=lossless&width=1872&height=59"
              }
            }
          ]
        }
      ]
    }
  ]
});

  }

};