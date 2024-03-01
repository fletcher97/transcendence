export default class MetaPongPage {
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
        <canvas id="three-canvas"></canvas>
        </div>
        </div>
        `;
  };

  setupLocalPong() {
    //   <!-- <script type="module" src="./services/client/threeScene.js"></script> -->
    const script = document.createElement("script");
    script.defer = true;
    script.type = "module";
    script.src = "/services/client/metaPong.js";
    document.body.appendChild(script);
  }
}
