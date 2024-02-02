export const fetchData = async () => {
    try {
      let username = localStorage.getItem("username");
      console.log(localStorage);
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      let data = await response.json();
      // console.log(data);
      return data;
      // data = "Fetched data";
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // isLoading = false;
      // await initialRender();
    }
  }