const {yellow, green} = require("chalk")
const { textSync } = require('figlet');
module.exports = {
    run: (client) => {
console.log(green(textSync(`${client.user?.username}`, { horizontalLayout: 'full' })));
console.log(yellow(textSync(`BuddyCodes`, { horizontalLayout: 'full' })));
console.log(green(`${client.guilds?.cache.size} Guilds | ${client.users?.cache.size} Users.  `))
    }
}
