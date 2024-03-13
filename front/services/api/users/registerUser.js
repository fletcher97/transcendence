import { DOMAIN_NAME } from "../../../config.js";

const registerUser = async (user) => {
  try {
    // make post request to server with user fields
    const response = await fetch(`https://${DOMAIN_NAME}/api/user/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      // credentials: "include",
    });

    console.log("response in registerUser: ", response);

    // if (!response.ok) {
    //   // If the response status is not OK (2xx), throw an error
    //   throw new Error(`Failed to register user. Status: ${response.status}`);
    // }

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error in registerUser:", error.message);
    throw error; // You can choose to rethrow the error or handle it gracefully
  }
};

export default registerUser;
