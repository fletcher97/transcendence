import { DOMAIN_NAME } from "../../../config.js";

// refresh tkoen

const logoutUser = async () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  try {
    const response = await fetch(`https://${DOMAIN_NAME}/api/user/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to log out user. Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export default logoutUser;
