import { Commands } from "../../interfaces/commands";

export const command: Commands = {
    // Note aliases are optional
    aliases: ["p"],
    cooldown: 3,
    cooldownResponse: "Hey! just wait like {time}",
    description: "Test if the bot is running and its response time!",
    example: ["!ping"],
    group: "info",
    name: "ping",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async(client, msg, args) => {
        // Run your code here
        return client.say(msg.params.target, "Pong! 🏓");
    }
};
