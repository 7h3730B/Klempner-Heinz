const { Client } = require('discord.js');
const Conf = require('./config.json');

const CHANNEL = '630105231878782987';
const GUILDID = '603929534147854377'; 
const OWNER = '274610195500367874';

const ROLES = [
    {
        name: "Heinz",
        color: #948d8d,
        permissions: 8,
        hoist: true,
        mentionable: false,
    },
    {
        name: "Admin",
        color: #0006ea,
        permissions: 8,
        hoist: true,
        mentionable: true,
    },
    {
        name: "Discord-Moderator",
        color: #29cc00,
        permissions: 267770945,
        hoist: true,
        mentionable: true,
    },
];

const CATEGORIES = [
    {
        name: "❗️❕ Staff ❗️❕",
        type: "text",
        channels: [
            "staff",
            "join-log",
            "log",
        ],
    },
    {
        name: "❗️❕ Official ❗️❕",
        type: "text",
        channels: [
            "regeln",
            "ankündigungen",
            "hilfe-und-feedback",
            "starboard",
        ],
    },
    {
        name: "📱 SOCIAL-MEDIA 📱",
        type: "text",
        channels: [
            "youtube",
            "instagram",
            "twitter",
        ],
    },
    {
        name: "❗️❕ GENERAL ❗️❕ ",
        type: "text",
        channels: [
            "general",
            "memes",
            "technik",
        ],
    },
    {
        name: "🎮 Games 🎮 ",
        type: "text",
        channels: [
            "games-general",
            "spielersuche",
        ],
    },
    {
        name: "❗️❕ TALKS ❗️❕",
        type: "voice",
        channels: [
            "Talk 1",
            "Talk 2",
            "Talk 3",
            "Talk 4",
            "Join to create own Voice"
        ],
    },
    {
        name: "🤖 BOT-FUN 🤖",
        type: "voice",
        channels: [
            "bot-commands",
            "🎶🎵 Musik 🎶🎵"
        ],
    },
];

const client = new Client();
let guild;

client.on("ready", () => {
    guild = client.guilds.get(GUILDID);
    console.log('Läuft...')
});

client.on("message", (message) => {
    if ( message.author.id == OWNER ) {

        if ( message.content == "setup-1" ) {
            console.log("Lösche alle Kanäle und Rollen.");
            guild.channels.filter((chan) => chan.id != CHANNEL)
                .forEach((chan) => console.delete()
                .catch(console.log));
            guild.roles.forEach((r) => r.delete()
                .catch(console.log));
            return;
        } else if ( message.content == "setup-2" ) {
            console.log("Erstelle Kanäle und Rollen.");
            ROLES.forEach((r) => guild.createRole(r));
            CATEGORIES.forEach((category) => {
                guild.createChannel(category.name, "category").then((cat) => {
                    category.channels.forEach((chan) => {
                        guild.createChannel(chan, category.type).then((chan) => {
                            chan.setParent(cat).catch(console.log);
                        }).catch(console.log);
                    });
                }).catch(console.log);
            });
            return;
        } else return;

    } else return;
});

client.login(Conf.token);