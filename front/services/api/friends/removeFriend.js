import { DOMAIN_NAME } from "../../../config.js";

const removeFriend = async (userId) => {
  try {
    // make post request to server with user fields
    const requestBody = {
      receiver_user_id: userId,
    };
    const response = await fetch(
      `https://${DOMAIN_NAME}/api/user/friend_remove/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        // credentials: "include",
      }
    );

    console.log("response in removeFriend: ", response);

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

export default removeFriend;
