const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } =require("discord.js") 
module.exports = {
data: new  SlashCommandBuilder()
.setName("ban") 
.setDescription("Ban a person")
.addUserOption(option => option.setName("user").setDescription("mention a person").setRequired(true)) 
.addStringOption(option => option.setName("reason").setDescription("give a reason").setRequired(true)),
run: async(client, interaction) => {
//lets check perms
if(!interaction.member.permissions.has("BAN_MEMBER")) return interaction.followUp("you don't have enough permissions")
let user = interaction.options.getUser("user")  
let reason = interaction.options.getString("reason")  
let member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => console.log(err))  
if(!member)  return interaction.followUp("i could not fetch details about that user.")  
if(!member.bannable || member.user.id === client.user.id) return interaction.followUp("i can't ban that user.")
if(interaction.member.roles.highest.position <= member.roles.highest.postion) return interaction.followUp("cant ban beacuse of role hierarchy")        
let embed = new MessageEmbed()
.setTitle("✅ | Sucessfully Banned")
.setDescription(`${member.user.tag} banned from guild\nReason: ${reason}`)
.setColor("GREEN")
.setTimestamp() 
//userd user cuz we fetched member that don't have user property
 member.user.send(`you were banned in 
${interaction.guild.name} for reason ` + "`" + reason + "`" )       
await member.ban({ reason })
interaction.followUp({embeds: [embed]})  //sorry :(     
} 
       
}
