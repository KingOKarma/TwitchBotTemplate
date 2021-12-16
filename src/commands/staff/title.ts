import { Commands } from "../../interfaces/commands";

export const command: Commands = {
    // Note aliases are optional
    cooldown: 3,
    cooldownResponse: "Hey! just wait like {time}",
    description: "Tells you if you're staff or not!",
    example: ["!checkstaff"],
    group: "staff",
    modOnly: true,
    name: "checkstaff",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async(client, msg, args) => {
        // Run your code here
        return client.say(msg.params.target, "You are staff! congratz!");
    }
};
