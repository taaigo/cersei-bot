const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Doesn't really do shit."),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}