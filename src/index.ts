import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

import { CLIENT_ID, GUILD_ID } from "../config";
import { commands, handleInteraction } from "./commands";

dotenv.config({ path: "../.env" });

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async interaction => {
    handleInteraction(interaction);
});

client.login(process.env.TOKEN);

// update commands
(async () => {
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN || "");
    const dev = process.env.NODE_ENV !== "production";

    try {
        console.log("Started refreshing application (/) commands.");

        if (dev) {
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                body: commands,
            });
        } else {
            await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commands,
            });
        }

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
