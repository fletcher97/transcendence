import { DOMAIN_NAME } from "../../../config.js";

const getRooms = async () => {
  try {
    const response = await fetch(`https://${DOMAIN_NAME}/api/rooms/rooms`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // credentials: "include",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }

    return await response.json();
    // Process the retrieved user data
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export default getRooms;
