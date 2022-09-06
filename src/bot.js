require('dotenv').config()

const { Client, GatewayIntentBits  } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const PREFIX = "$";

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
})
client.on('message', async (message)=>{
    if (message.author.bot) return;
    console.log(`[${message.tag}]: ${message.content}`);
    if (message.content == 'hello') {
        message.channel.send("hello");
    }
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You do not have permissions to use that command')
            if(args.length === 0) 
                return message.reply("provide an id");
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch((err) => message.channel.send('I cannot kick that user :('));
            } else {
                message.channel.send("That member was not found");
            }
        }else if (condition) {
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('You do not have permissions to use that command')
            if(args.length === 0) return message.reply("provide an id");
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User successfully banned')
            } catch (err) {
                console.log(err);
                message.channel.send('Unexpected error');
            }
        }
    }
})
client.login(process.env.DISCORDJS_BOT_TOKEN);
