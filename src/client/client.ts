import { CONFIG, TOKEN } from "../utils/globals";
import { RefreshableAuthProvider, StaticAuthProvider } from "twitch-auth";
import { ApiClient } from "twitch";
import { ChatClient } from "twitch-chat-client";
import { Commands } from "../interfaces/commands";
import { Events } from "../interfaces/events";
import Token from "../utils/token";
import { eventBinder } from "../utils/eventBinder";
import fs from "fs";
import path from "path";

// Config consts
const { clientID } = CONFIG;
const { clientSecret } = CONFIG;


// Auth Consts
export const authProvider = new RefreshableAuthProvider(
    new StaticAuthProvider(clientID, TOKEN.tokenData.accessToken),
    {
        clientSecret,
        expiry: TOKEN.tokenData.expiryTimestamp === null ? null : new Date(TOKEN.tokenData.expiryTimestamp),
        onRefresh: async ({ accessToken, refreshToken, expiryDate }): Promise<void> => {
            const newTokenData = {
                accessToken,
                expiryTimestamp: expiryDate === null ? null : expiryDate.getTime(),
                refreshToken
            };
            TOKEN.tokenData = newTokenData;
            Token.saveConfig();
        },
        refreshToken: TOKEN.tokenData.refreshToken
    }
);


class ExtendedClient extends ChatClient {
    public aliases: Map<string, Commands> = new Map();
    public apiClient = new ApiClient({ authProvider });
    public clientEvent = eventBinder(this);
    public commands: Map<string, Commands> = new Map();
    public events: Map<string, Events> = new Map();

    public async initChatClient(): Promise<void> {


        /* Commands */
        const commandPath = path.join(__dirname, "..", "commands");
        console.log(commandPath);
        fs.readdirSync(commandPath).forEach(async (dir) => {
            const cmds = fs.readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".js"));

            for (const file of cmds) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { command } = await import(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);

                if (command?.aliases !== undefined) {
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });

        await this.connect().then(void console.log("Sucessfully connected bot client!"));


        /* Events */
        const eventPath = path.join(__dirname, "..", "events");
        fs.readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            console.log(event);
            this.events.set(event.name, event);
            this.clientEvent.on(event.name, event.run.bind(null, this));
        });

    }


}

export default ExtendedClient;
