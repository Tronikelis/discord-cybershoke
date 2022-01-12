import { Interaction } from "discord.js";

import { getRetakes } from "./controllers";

const commands = [
    {
        name: "retakes",
        description: "Get cybershoke json api data",
    },
];

const handleInteraction = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case "retakes":
            interaction.reply(await getRetakes());
    }
};

export { commands, handleInteraction };
