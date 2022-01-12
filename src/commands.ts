import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "discord.js";

import { getRetakes } from "./controllers";

const commands = [new SlashCommandBuilder().setName("retakes").setDescription("gets")];

const handleInteraction = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case "retakes":
            interaction.reply(await getRetakes());
    }
};

export { commands, handleInteraction };
