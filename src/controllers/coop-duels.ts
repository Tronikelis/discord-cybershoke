import axios from "axios";
import { CommandInteraction } from "discord.js";

import { BASE_URL, headers } from "../../config";
import { AxiosCybershoke, Duels } from "../../types";

export async function getCoopDuels(interaction: CommandInteraction) {
    const { data } = await axios.get<AxiosCybershoke>(`${BASE_URL}/servers/online`, {
        headers,
    });

    const choseMap = interaction.options.get("map");

    const duels = data.servers.DUELS2X2[(choseMap?.value || "ONLY MIRAGE") as keyof Duels]
        .filter(({ players }) => players <= 14 && players >= 3)
        .map(({ ip, port }) => `${ip}:${port}`)
        .slice(0, 1)
        .map(val => `connect ${val}`)
        .reduce((prev, curr) => `${prev}\n${curr}`, "");

    if (duels) {
        interaction.reply(`Duels 2v2 on ${choseMap?.value || "random"} map: ${duels}`);
        return;
    }

    interaction.reply("Servers are either full or empty");
}
