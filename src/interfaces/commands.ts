/* eslint-disable @typescript-eslint/member-ordering */
import ExtendedClient from "../client/client";
import { TwitchPrivateMessage } from "twitch-chat-client/lib/StandardCommands/TwitchPrivateMessage";

type Run = (client: ExtendedClient, msg: TwitchPrivateMessage, args: string[],) => void;

export interface Commands {
    name: string;
    description: string;
    cooldown?: number;
    cooldownResponse?: string;
    example: string[];
    aliases?: string[];
    group: string;
    run: Run;

}
