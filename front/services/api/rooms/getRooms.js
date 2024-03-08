const getRooms = async () => {
  try {
    const response = await fetch(`https://localhost/api/rooms/rooms`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
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
