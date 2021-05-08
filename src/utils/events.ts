import { ClientCredentialsAuthProvider, StaticAuthProvider } from "twitch-auth";
import { ApiClient } from "twitch";
import { CONFIG } from "../utils/globals";
import { ChatClient } from "twitch-chat-client";
import { TwitchPrivateMessage } from "twitch-chat-client/lib/StandardCommands/TwitchPrivateMessage";

// Config consts
const { clientID } = CONFIG;
const { clientSecret } = CONFIG;
const { botAccessToken } = CONFIG;
const { accessToken } = CONFIG;
const { prefix } = CONFIG;

// Auth Consts
const authProvider = new ClientCredentialsAuthProvider(clientID, clientSecret);
const authChatProvider = new StaticAuthProvider(clientID, botAccessToken);
const authUserChatProvider = new StaticAuthProvider(clientID, accessToken);
const apiClient = new ApiClient({ authProvider });


export async function intiChatClient(): Promise<void> {

    const chatClient = new ChatClient(authChatProvider, { channels: [CONFIG.twitchUsername] });
    const userChatClient = new ChatClient(authUserChatProvider, { channels: [CONFIG.twitchUsername] });
    // Listen to more events...
    await chatClient.connect().then(void console.log("Sucessfully connected bot client!"));
    await userChatClient.connect().then(void console.log("Sucessfully connected user client!"));

    chatClient.onMessage(async (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => {
        if (user === CONFIG.botUsername) return;

        const args = message.slice(prefix.length).trim().split(/ +/g);

        const cmd = args.shift()?.toLowerCase();

        if (message.toLowerCase() === "hello") {
            const owner = await apiClient.helix.users.getUserByName(CONFIG.twitchUsername);
            void chatClient.say(channel, `Heya! did you know ${owner?.displayName} is the owner of this bot`);
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const commandFile = require(`../commands/${cmd}.js`);
            commandFile.run(chatClient, channel, user, message, msg, args);

        } catch (err) {

        }

    });

}