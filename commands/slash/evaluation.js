const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

data: new SlashCommandBuilder()
.setName("evaluation")
.setDescription("Evaluate a user.")

.addSubcommand(sub =>
  sub
    .setName("issue")
    .setDescription("Issue an evaluation to a user.")

    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Select the user you are evaluating.")
        .setRequired(true)
    )

    .addNumberOption(option =>
      option
        .setName("rating")
        .setDescription("Select the rating of the user (1-5).")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("notes")
        .setDescription("Input notes for the evaluation.")
        .setRequired(true)
    )
),

async execute(interaction) {

const REQUIRED_ROLE_ID = "1460118948891852800";
const EVALUATION_CHANNEL_ID = "1481326547028672686";

if (
  !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
  !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
) {
  return interaction.reply({
    content: "<:xMark:1480446157254688850> You do **not** have **permission** to use this command.",
    ephemeral: true
  });
}

const sub = interaction.options.getSubcommand();

const user = interaction.options.getUser("user");
const rating = interaction.options.getNumber("rating");
const notes = interaction.options.getString("notes");

const channel = interaction.guild.channels.cache.get(EVALUATION_CHANNEL_ID);

if (!channel) {
  return interaction.reply({
    content: "<:xMark:1480446157254688850> Failed to **fetch** evaluation channel.",
    ephemeral: true
  });
}

if (sub === "issue") {

  await user.send({
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
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1481354133024936117/ECHO_Customs_1.png?ex=69b3020b&is=69b1b08b&hm=445deb99c715e39103cbee73383cc386dc51ab725804f1b2128d1a4c26812d2b&=&format=webp&quality=lossless&width=550&height=189"
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
          "content": "An evaluation has been issued to you. Review information below."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": "**User**: ${user}\n**Rating**: ${rating}\n**Reason**: ${reason}"
        },
        {
          "type": 1,
          "components": [
            {
              "style": 4,
              "type": 2,
              "label": "${rating}/5",
              "flow": {
                "actions": []
              },
              "custom_id": "p_278951624951468044"
            }
          ]
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
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1480598651091812614/TXRP.png?ex=69b2e572&is=69b193f2&hm=ffee8f61382ec4792a35113e163f126d1375e34061805c317920e5d297d73211&=&format=webp&quality=lossless&width=2512&height=79"
              }
            }
          ]
        }
      ]
    }
  ]
})
  await interaction.reply({
    content: "<:check:1480446183997571296> **Successfully issued evaluation.**",
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
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1481354133024936117/ECHO_Customs_1.png?ex=69b3020b&is=69b1b08b&hm=445deb99c715e39103cbee73383cc386dc51ab725804f1b2128d1a4c26812d2b&=&format=webp&quality=lossless&width=550&height=189"
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
          "content": `An evaluation has been issued by ${interaction.user}. Review information below.`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": `**User**: ${user}\n**Rating**: ${rating}\n**Reason**: ${reason}`
        },
        {
          "type": 1,
          "components": [
            {
              "style": 4,
              "type": 2,
              "label": `${rating}/5`,
              "flow": {
                "actions": []
              },
              "custom_id": "p_278951624951468044"
            }
          ]
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
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1480598651091812614/TXRP.png?ex=69b2e572&is=69b193f2&hm=ffee8f61382ec4792a35113e163f126d1375e34061805c317920e5d297d73211&=&format=webp&quality=lossless&width=2512&height=79"
              }
            }
          ]
        }
      ]
    }
  ]
})
}

}

};