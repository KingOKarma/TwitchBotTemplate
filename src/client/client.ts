import { CONFIG, TOKEN } from "../utils/globals";
import { ApiClient } from "@twurple/api";
import { ChatClient } from "@twurple/chat";
import { Commands } from "../interfaces/commands";
import { Cooldowns } from "../interfaces/cooldowns";
import { Events } from "../interfaces/events";
import { RefreshingAuthProvider } from "@twurple/auth";
import Token from "../utils/token";
import { eventBinder } from "../utils/eventBinder";
import fs from "fs";
import path from "path";

// Config consts
const { clientId } = CONFIG;
const { clientSecret } = CONFIG;

// Auth Consts
export const authProvider = new RefreshingAuthProvider(
    {
        clientId,
        clientSecret,
        onRefresh: (newTokenData): void => {
            TOKEN.tokenData = newTokenData;
            Token.saveConfig();
        }
    },
    TOKEN.tokenData
);

class ExtendedClient extends ChatClient {
    public aliases: Map<string, Commands> = new Map();
    public apiClient = new ApiClient({ authProvider });
    public clientEvent = eventBinder(this);
    public commands: Map<string, Commands> = new Map();
    public cooldowns: Map<string, Cooldowns> = new Map();
    public events: Map<string, Events> = new Map();
    public startedAt = Date.now();

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

        await this.connect().then(() => {
            console.log(`Sucessfully connected to Twitch client as ${CONFIG.botUsername}`);
        }).catch(console.error);


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
