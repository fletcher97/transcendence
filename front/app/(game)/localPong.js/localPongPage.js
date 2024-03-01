export default class LocalPongPage {
  constructor(switchRoute, switchPage) {
    const content = document.getElementById("app");
    if (content) {
      console.log("content: ", content);
      content.innerHTML = this.getHtml();
      this.setupLocalPong();
    }
  }

  getHtml = () => {
    return `
    <div class="row align-items-center" style="min-height: 95vh">
      <div class="d-flex align-items-center justify-content-center full-height">
        <canvas height="500" width="700" id="local-pong-canvas"></canvas>
      </div>
    </div>
`;
  };

  setupLocalPong() {
    const script = document.createElement("script");
    script.defer = true;
    script.type = "module";
    script.src = "/services/client/localPong.js";
    document.body.appendChild(script);
  }
}
