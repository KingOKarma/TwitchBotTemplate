import { Commands } from "../../interfaces/commands";

export const command: Commands = {
    // Note aliases are optional
    aliases: ["p"],
    cooldown: 3,
    cooldownResponse: "Hey! just wait like {time}",
    description: "Test if the bot is running and its response time!",
    example: ["!title We've been streaming for {mt} minuites!", "!title Stream time {h} hours and {m} minuites!", "!title Streaming for {time}!"],
    group: "info",
    modOnly: true,
    name: "ping",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async(client, msg, args) => {
        // Run your code here
        return client.say(msg.params.target, "Pong! 🏓");
    }
};
