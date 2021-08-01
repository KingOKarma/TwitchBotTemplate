import ChatClient from "../client/client";
import { TwitchEvents } from "../utils/eventBinder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Run = (client: ChatClient, ...args: any[]) => void;

export interface Events {
    name: TwitchEvents;
    run: Run;
}
