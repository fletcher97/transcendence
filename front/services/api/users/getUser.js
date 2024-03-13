import { DOMAIN_NAME } from "../../../config.js";

const getUser = async (userId) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `https://${DOMAIN_NAME}/api/user/account/${userId}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          // credentials: "include",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }

    return await response.json();
    // Process the retrieved user data
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export default getUser;
