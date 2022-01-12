import axios from "axios";

import { BASE_URL, headers } from "../../config";
import { AxiosCybershoke } from "../../types";

export default async function getRetakes() {
    const { data } = await axios.get<AxiosCybershoke>(`${BASE_URL}/servers/online`, {
        headers,
    });

    const retakes = data.servers.RETAKE["9 SLOTS"].map(({ ip }) => ip);
    return JSON.stringify(retakes);
}
