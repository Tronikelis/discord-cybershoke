import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "discord.js";

import { getCoopDuels, getRetakes } from "./controllers";

const commands = [
    new SlashCommandBuilder()
        .setName("retakes")
        .setDescription("Get a retake server")
        .addStringOption(option =>
            option
                .setName("map")
                .setDescription("Choose a map")
                .setRequired(false)
                .addChoice("Mirage", "de_mirage")
                .addChoice("Dust 2", "de_dust2")
                .addChoice("Vertigo", "de_vertigo")
                .addChoice("Nuke", "de_nuke")
                .addChoice("Inferno", "de_inferno")
        ),
    new SlashCommandBuilder()
        .setName("2x2")
        .setDescription("Get a duels 2x2 server")
        .addStringOption(option =>
            option
                .setName("map")
                .setDescription("Choose a map")
                .setRequired(false)
                .addChoice("Mirage", "duels_mirage_2x2")
                .addChoice("Dust 2", "ONLY DUST2")
        ),
];

const handleInteraction = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case "retakes":
            getRetakes(interaction);
            break;
        case "2x2":
            getCoopDuels(interaction);
    }
};

export { commands, handleInteraction };
