import { DOMAIN_NAME } from "../../../config.js";

const createRoom = async (room) => {
  console.log("room: ", room);
  try {
    // make post request to server with user fields
    const requestBody = {
      name: room.name,
      player1: room.player1,
      player2: null,
      is_active: true,
      created_at: room.time,
      updated_at: room.time,
    };
    const response = await fetch(`https://${DOMAIN_NAME}/api/rooms/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      // credentials: "include",
    });

    console.log("response in createRoom: ", response);

    if (!response.ok) {
      // If the response status is not OK (2xx), throw an error
      throw new Error(`Failed to register user. Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error in registerUser:", error.message);
    throw error; // You can choose to rethrow the error or handle it gracefully
  }
};

export default createRoom;
