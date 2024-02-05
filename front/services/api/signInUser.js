const signInUser = async (user) => {
  try {
    // make post request to server with user fields
    console.log("user in signInUser: ", user);

    const response = await fetch("https://localhost:443/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log("response in signInUser: ", response);

    if (!response.ok) {
      // If the response status is not in the range 200-299
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle any other errors that might occur during the fetch
    console.error("Error in signInUser:", error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

export default signInUser;
