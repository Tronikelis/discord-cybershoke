import axios from "axios";
import { CommandInteraction } from "discord.js";

import { BASE_URL, headers } from "../../config";
import { AxiosCybershoke } from "../../types";

export async function getRetakes(interaction: CommandInteraction) {
    const { data } = await axios.get<AxiosCybershoke>(`${BASE_URL}/servers/online`, {
        headers,
    });

    const choseMap = interaction.options.get("map");

    const retakes = data.servers.RETAKECLASSIC["OPEN TO ALL - 9 SLOTS"]
        .filter(({ country }) => ["ru", "de"].includes(country))
        .filter(({ players }) => players <= 6 && players >= 3)
        .filter(({ map }) => {
            if (!choseMap) return true;
            return map === choseMap.value;
        })
        .map(({ ip, port }) => `${ip}:${port}`)
        .slice(0, 1)
        .map(val => `connect ${val}`)
        .reduce((prev, curr) => `${prev}\n${curr}`, "");

    if (retakes) {
        interaction.reply(`Retakes on ${choseMap?.value || "random"} map: ${retakes}`);
        return;
    }

    interaction.reply("Servers are either full or empty");
}
