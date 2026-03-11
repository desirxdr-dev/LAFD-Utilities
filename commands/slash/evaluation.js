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

  await interaction.reply({
    content: "<:check:1480446183997571296> **Successfully issued evaluation.**",
    ephemeral: true
  });

  channel.send(`Evaluation issued for ${user}
Rating: **${rating}/5**
Notes: ${notes}`);
}

}

};