import ChatClient, { authProvider } from "./client/client";
import { CONFIG } from "./utils/globals";

new ChatClient(authProvider, { channels: [CONFIG.twitchUsername] }).intiChatClient().catch(console.error);
