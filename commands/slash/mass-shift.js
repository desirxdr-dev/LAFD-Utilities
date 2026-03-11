const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

data: new SlashCommandBuilder()
.setName("mass-shift")
.setDescription("Manage department shifts")

.addSubcommand(sub =>
  sub
    .setName("start")
    .setDescription("Start a mass shift.")
    .addUserOption(option =>
      option
        .setName("cohost")
        .setDescription("Select the co-host of the shift.")
        .setRequired(true)
    )
)

.addSubcommand(sub =>
  sub
    .setName("end")
    .setDescription("End a mass shift.")
),

async execute(interaction) {

const REQUIRED_ROLE_ID = "1460118948891852800";
const SHIFT_CHANNEL_ID = "1460381266116476958";

if (
  !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
  !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
) {
  return interaction.reply({
    content: "<:xMark:1480446157254688850> You do **not** have **permission** to use this command.",
    ephemeral: true
  });
}

const coHost = interaction.options.getUser("cohost");
const sub = interaction.options.getSubcommand();
const channel = interaction.guild.channels.cache.get(SHIFT_CHANNEL_ID);

if (!channel) {
  return interaction.reply({
    content: "<:xMark:1480446157254688850> Failed to **fetch** shift channel.",
    ephemeral: true
  });
}

if (sub === "start") {

  await interaction.reply({
    content: "<:check:1480446183997571296> **Successfully** sent mass shift start message.",
    ephemeral: true
  });

  channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 10,
      "content": "@everyone"
    },
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1480684033502478517/TXRP.png?ex=69b28c37&is=69b13ab7&hm=56e3f1e01ba329383a5a909e5a31bbe62254a00c44a49c827669a50e6748ceb3&=&format=webp&quality=lossless&width=2408&height=826"
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
          "content": `A mass shift is being hosted by ${interaction.user}. If you are available, ensure to join the shift. Mass shifts are shifts hosted by Command members in which many department personnel get on shift. During a mass shift, you are constantly under evaluation and observation from our Command team, so ensure to follow all department regulations.`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": `**Shift Host**: ${interaction.user}\n**Shift Co-Host:** ${coHost}`
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
});

}

if (sub === "end") {

  await interaction.reply({
    content: "<:check:1480446183997571296> **Succesfully** ended mass shift.",
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
                "url": "https://media.discordapp.net/attachments/1480452225149964454/1480684033502478517/TXRP.png?ex=69b28c37&is=69b13ab7&hm=56e3f1e01ba329383a5a909e5a31bbe62254a00c44a49c827669a50e6748ceb3&=&format=webp&quality=lossless&width=2408&height=826"
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
          "content": "The recent mass shift has come to an end. We thank everyone who attended for their contributions to the shift & department. Another mass shift will be hosted soon, so ensure to check this channel for updates."
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
});

}

}

};