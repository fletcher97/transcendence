import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.isLoading = false; // Initial loading state
    this.data = null; // Placeholder for fetched data
    this.fetchData(); // Start fetching data
  }

  async fetchData() {
    try {
      // Simulate a delay (replace with your actual fetch logic)
      await new Promise((resolve) => setTimeout(resolve, 500));
       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      console.log(data);

      // Once data is fetched, update the state
      this.data = "Fetched data"; // Replace with your actual data
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        this.render(); // Re-render the view
    }
}

render() {
    // Assuming there is a root element with an ID 'app' where the view is rendered
    const content = document.getElementById("header");
    console.log(content);
    if (content) {
        this.isLoading = false; // Update loading state
        content.innerText = this.getHtml(); // Update the content with new HTML
        console.log("loading?: ", this.isLoading);
    }
  }

  getHtml() {
    if (this.isLoading) {
      // Display a spinner or loading message while fetching data
      return `
            <div id="content" class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
                <div class="spinner-border" role="status">
                <span class="sr-only"></span>
                  </div> </div>
                  `;
    } else {
      return `
          <h1>LOL GREAT</h1>
          `;
    }
  }
}
