/* eslint-disable @typescript-eslint/member-ordering */

import { ChatClient } from "twitch-chat-client/lib";
import { TwitchPrivateMessage } from "twitch-chat-client/lib/StandardCommands/TwitchPrivateMessage";

type Run = (client: ChatClient, msg: TwitchPrivateMessage, args: string[],) => void;

export interface Commands {
    name: string;
    description: string;
    example: string[];
    aliases?: string[];
    group: string;
    run: Run;

}
