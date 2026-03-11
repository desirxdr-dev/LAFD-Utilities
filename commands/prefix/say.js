module.exports = {
  name: "say",

  async execute(message, args) {

    if (!args.length) {
      return message.reply("<:xMark:1480446157254688850> Failed to detect **message** provided.");
    }

const REQUIRED_ROLE_ID = "1460117949770629304"
    if (
      !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply("<:xMark:1480446157254688850> You do **not** have **permission** to use this command.");
    }

    const text = args.join(" ");

    try {
      await message.delete();
    } catch {}

    message.channel.send(text);

  }
};