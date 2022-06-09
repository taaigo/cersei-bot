
module.exports = {
    name: 'messageCreate',

    execute(message) {
        if(message.member.bot) return;

        const content = message.content.toLowerCase();

        if(content === 'chin') {
            message.channel.send('Epic double triple kwartet chin!');
        }

        const activityStatus = message.member.presence.activities[0]?.name;
        if(activityStatus === 'League of Legends') {
            message.channel.send("no league, GET BANNED!");
            message.member.send('You got banned for playing League of Legends')
            message.member.ban({reason: 'Playing League of Legends'});
        }
    }
}