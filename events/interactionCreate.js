module.exports = {
    name: 'InteractionCreate',

    execute(interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    }
}