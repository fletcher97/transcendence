const acceptFriendRequest = async (requestId) => {
  console.log("requestId: ", requestId);
  try {
    // make post request to server with user fields
    const response = await fetch(
      `https://localhost:443/api/user/accept_friend_request/${requestId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    console.log("response in acceptFriendRequest: ", response);

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

export default acceptFriendRequest;
