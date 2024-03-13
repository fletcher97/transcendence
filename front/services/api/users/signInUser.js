import { DOMAIN_NAME } from "../../../config.js";

const signInUser = async (user) => {
  try {
    // make post request to server with user fields
    console.log("user in signInUser: ", user);

    const response = await fetch(`https://${DOMAIN_NAME}/api/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
      // credentials: "include",
    });
    // delay for 1s

    if (!response.ok) {
      // If the response status is not in the range 200-299
      console.log("response is not ok");
      throw new Error(`Server responded with status: ${response.status}`);
    }

    console.log("response in signInUser: ", response);
    return response;
  } catch (error) {
    // Handle any other errors that might occur during the fetch
    console.error("Error in signInUser:", error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

export default signInUser;
