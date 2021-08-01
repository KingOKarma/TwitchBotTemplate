import { CONFIG } from "../utils/globals";
import { Events } from "../interfaces/events";
import { TwitchPrivateMessage } from "twitch-chat-client/lib/StandardCommands/TwitchPrivateMessage";

export const event: Events = {
    name: "message",
    run: (client, channel: string, user: string, message: string, msg: TwitchPrivateMessage) => {
        if (user === CONFIG.botUsername) return;

        if (!message.startsWith(CONFIG.prefix)) return;

        const args = message
            .slice(CONFIG.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.shift()?.toLowerCase();

        if (cmd === undefined) return;
        const command = client.commands.get(cmd) ?? client.aliases.get(cmd);
        if (command !== undefined) {

            command.run(client, msg, args);
        }

    }
};