import { DOMAIN_NAME } from "../../../config.js";

const editUser = async (user, userId) => {
  console.log("user in editUser(): ", user);
  console.log("userId in editUser(): ", userId);
  const accessToken = localStorage.getItem("access_token");
  try {
    // make post request to server with user fields
    const response = await fetch(
      `https://${DOMAIN_NAME}/api/user/account/${userId}/edit/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: user,
      }
    );

    console.log("response in registerUser: ", response);

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

export default editUser;
