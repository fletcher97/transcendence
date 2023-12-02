export function loadContent(url) {
  console.log("WTF");
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    })
    .catch((error) => console.error("Error:", error));
}
