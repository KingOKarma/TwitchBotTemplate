import { CONFIG } from "../utils/globals";
import { Events } from "../interfaces/events";
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";
import { checkPerms } from "../utils/functions/checkPerms";
import ms from "ms";

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

            if (command.cooldown !== undefined) {
                const cooldown = client.cooldowns.get(`${command.name}/${msg.userInfo.userId}`);
                if (cooldown) {
                    const timePassed = Date.now() - cooldown.timeSet;
                    const timeLeft = command.cooldown * 1000 - timePassed;

                    let response = `${command.cooldownResponse ?? `Hey you're going too fast, please wait another ${ms(timeLeft)}`}`;

                    if (response.includes("{time}")) {
                        const replace = new RegExp("{time}", "g");
                        response = response.replace(replace, ms(timeLeft));
                    }

                    return client.say(msg.params.target,
                        `@${user} ${response}`);
                }
                client.cooldowns.set(`${command.name}/${msg.userInfo.userId}`, {
                    command: command.name,
                    cooldownTime: command.cooldown,
                    timeSet: Date.now(),
                    userID: msg.userInfo.userId
                });

                setTimeout(() => {
                    client.cooldowns.delete(`${command.name}/${msg.userInfo.userId}`);
                }, command.cooldown * 1000);

            }

            if (command.modOnly !== undefined && command.modOnly) {
                if (!checkPerms(msg)) return client.say(msg.params.target, `@${user} Sorry that command can only be used by Mods and above!`);
            }

            command.run(client, msg, args);
        }

    }
};