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
       <div id="meta-pong-container" class="d-flex text-align-center justify-content-between gap-5 row align-items-center" style="min-height: 95vh">
          <div class="d-flex justify-content-center gap-5 z-5">
            <h1 id="meta-score-1" class="glow-blue"></h1>
            <h1 class="glow-blue">-</h1>
            <h1 id="meta-score-2" class="glow-blue"></h1>
          </div>
          <p></p>
          <h2 id="meta-announce" style="z-index:5;" class="glow-blue text-center">Begin game by intersecting ball</h2 id="meta-announce">
           <canvas id="three-canvas"></canvas>
        </div>
        `;
  };

  setupLocalPong() {
    //   <!-- <script type="module" src="./services/client/threeScene.js"></script> -->
    const script = document.createElement("script");
    // const canvas = document.createElement("canvas");
    // script.id = "local-pong-script";
    script.defer = true;
    script.type = "module";
    script.src = "/services/client/metaPong.js";
    // canvas.id = "three-canvas";
    const metaPongContainer = document.getElementById("meta-pong-container");
    console.log("meta pong container: ", metaPongContainer);
    metaPongContainer.appendChild(script);
    // metaPongContainer.appendChild(canvas);
  }
}
