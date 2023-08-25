import { ChronusUser } from "../types/ChronusUser";
import { SimpleUser } from "../types/SimpleUser";

const axios = require("axios");

/* TODO: figure out how uni key gets injected here */

export const updateChronusUser = async (user: ChronusUser) => {
  try {
    const response = await axios.put(
      `${process.env.CHRONUS_BASE_URL}/members/${user.uuid}?api_key=${process.env.CHRONUS_API_KEY}`
    );
    return response.data as ChronusUser | undefined;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
