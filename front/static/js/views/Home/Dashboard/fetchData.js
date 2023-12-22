export const fetchData = async () => {
    try {
      this.username = localStorage.getItem("username");
      console.log(localStorage);
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
      this.data = "Fetched data";
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false;
      await this.initialRender();
    }
  }