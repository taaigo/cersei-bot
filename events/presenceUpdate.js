module.exports = {
    name: 'presenceUpdate',

    execute(member, guild) {
        const activityStatus = member.activities[0]?.name;
        if(!member.activities[0]) return;
        if(activityStatus === 'League of Legends') {
            guild.member.send("You have been banned!\nreason: Playing League of Legends is against the rules in the server.");

            function banMember() {
                guild.member.ban({reason: 'Playing League of Legends'});
            }
            setTimeout(banMember, 1500);
        }
    }
}