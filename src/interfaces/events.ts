import ChatClient from "../client/client";
import { ChatClientEvents } from "../utils/eventBinder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Run = (client: ChatClient, ...args: any[]) => void;

export interface Events {
    name: ChatClientEvents;
    run: Run;
}
