import { loadContent } from "./loadContent.js";
import { animateThree } from "./threeScene.js";

// Function to load content and update the URL
function loadContentAndUpdateURL(url) {
  // Load content
  console.log("WTF");
  loadContent(url);

  // mkae url only string after /
  // const urlWithoutDomain = url.replace(window.location.origin, "");
  // if url /pages/about, make it just /about
  const urlWithoutDomain = url.replace(window.location.origin, "");
  console.log("url without domain: ", urlWithoutDomain);
  // get part of string after final slash
  const urlWithoutDomain2 = urlWithoutDomain.substring(
    urlWithoutDomain.lastIndexOf("/") + 1
  );
  // remove .html suffix
  urlWithoutDomain2 = urlWithoutDomain.replace(".html", "");
  // Update the URL without triggering a page reload
  history.pushState(null, null, urlWithoutDomain2);
  if (urlWithoutDomain2 === "about") animateThree();
}

// Example: Load content and update URL when a navigation link is clicked
document
  .getElementById("nav-link-about")
  .addEventListener("click", function (event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the target URL from the link's href attribute
    const targetUrl = this.getAttribute("href");

    // Load content and update URL
    loadContentAndUpdateURL(targetUrl);
  });
