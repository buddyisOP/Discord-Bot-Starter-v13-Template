const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
name: "help",
description:"get command information",
category: "information",
run: async(client, message, args) => {
const directories = [...new Set(client.prefix_commands.map(cmd => cmd.category))]       
// formating string
const FormatString = (str) =>
`${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

const categories = directories.map((dir) => {
const getCommands = client.prefix_commands.filter((cmd)=> cmd.category === dir).map((cmd) => {
return {
name: cmd.name || "No command Name Found",
description: cmd.description || "No Command Description Found"        
}        
})
return {
directory: FormatString(dir),
commands: getCommands,        
}
})

const embed = new MessageEmbed()
.setAuthor(`${message.guild.name} Help Command`, message.author.displayAvatarURL())
.setDescription("Please Select Category in Menu")
.setFooter(`• ${client.user?.username}`) 
.setThumbnail(message.guild.iconURL({dynamic: true})) 
.setTimestamp()
.setColor("BLUE")        
 const components = (state)=> [
new MessageActionRow().addComponents(
new MessageSelectMenu()        
.setCustomId("help-command")
.setPlaceholder("Please select a category")
.setDisabled(state)
.addOptions(categories.map((cmd) => { return {
label: cmd.directory,
value: cmd.directory,
description: cmd.directory        
}
                                   })))]
let InitialMessage = await message.channel.send({embeds: [embed],
components: components(false)                                                })
const filter = (interaction) => 
interaction.user.id === message.author.id
const collector = message.channel.createMessageComponentCollector({filter, 
contentType: "SELECT_MENU",
time: 50000                                                                  })        
collector.on("collect", (interaction) => {
const [ directory ] = interaction.values
const category = categories.find(x => x.directory === directory)
const EditEmbed = new MessageEmbed()
.setAuthor(`${directory} commands`, message.author.displayAvatarURL())
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setTimestamp()
.setFooter("• help command")        
category.commands.map((cmd) => {
EditEmbed.setDescription(`Type ?help [\`command name\`] for more information\n\`${cmd.name || "No Name"}\`\n${cmd.description}`)
}
)        
interaction.update({embeds: [EditEmbed]})        
})
collector.on("end", () => {
InitialMessage.edit({components: components(true)})        
})        
  },     
};