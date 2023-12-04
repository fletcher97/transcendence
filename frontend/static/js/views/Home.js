import AbstractView from "./AbstractView.js";
import {switchView} from "../index.js"


export default class extends AbstractView {
  constructor() {
    super();
    this.isLoading = true; // Initial loading state
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
      this.isLoading = false; // Update loading state
      this.render(); // Re-render the view
    }
  }

  render() {
    // Assuming there is a root element with an ID 'app' where the view is rendered
    const content = document.getElementById("content");
    if (content) {
      content.innerHTML = this.getHtml(); // Update the content with new HTML
    }
    const button = document.querySelector("#playbtn");
    if (button) {
      button.addEventListener("click", () => (switchView("login")));
    }
    const updateViewButton = document.querySelector("#update-view-btn");
    if (updateViewButton) {
      // updateViewButton.addEventListener("click", () => (switchView("chooseGame")));
      updateViewButton.addEventListener("click", () => updateViewButton.innerText = "woow");
    }
  }

  getHtml() {
    if (this.isLoading) {
      // Display a spinner or loading message while fetching data
      return `
            <div id="content" class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
                <div class="spinner-border" role="status">
                <span class="sr-only"></span>
                
                  </div> </div>`;
    } else {
      return `
          <div id="content" class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
          <h1 id="header">home</h1>
          <a href="/login" data-link>
          <h1>haha</h1>
          <button id="playbtn" type="button" class="btn btn-secondary btn-lg">Login</button>
          <button id="update-view-btn" type="button" class="btn btn-secondary btn-lg">${this.data}</button>
          </a>
          </div>    
          `;
    }
  }
}
