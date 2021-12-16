import { Events } from "../interfaces/events";

export const event: Events = {
    name: "ready",
    run: (client) => {

        console.log("Commands:\n", [...client.commands.values()].map((v) => `[${v.group}] ${v.name} - ${v.description}\n`));

    }
};