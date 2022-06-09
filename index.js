const fs = require('fs');
const path = require('node:path');
const { Client, Collection, Intents, Interaction } = require('discord.js');
const { token, prefix } = require('./config.json');
const { italic } = require('@discordjs/builders');

const client = new Client({ intents: [
     Intents.FLAGS.GUILDS,
     Intents.FLAGS.GUILD_MESSAGES,
     Intents.FLAGS.GUILD_MEMBERS,
     Intents.FLAGS.GUILD_PRESENCES
    ]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', emphemeral: true });
    }
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    let { prefix } = require('./config.json');

    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
  
    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let cmd = args.shift()?.toLowerCase();
  
    if (!message.content.startsWith(prefix)) return;
    if (!client.commands.has(cmd)) return;
  
    try {
      client.commands.get(cmd).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("error desu");
    }
});

client.login(token);