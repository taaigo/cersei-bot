const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ephemeral')
        .setDescription('test ephemeral message'),
    async execute(interaction) {
        await interaction.reply({ content: 'OwO only you can see me!', ephemeral: true});
    }
}