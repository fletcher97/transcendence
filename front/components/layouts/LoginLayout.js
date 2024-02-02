import Toast from "../Toast.js"
import Spinner from "../Spinner.js"

const LoginLayout = () => {
    return ` <div class="container d-flex align-items-center justify-content-center" style="height: 95vh;">
        <div class="row justify-content-center">
          <h1 class="hidden text-center glow">42-PONG</h1>
          <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
          </div>
        </div>
      </div>
      <b>made by @fletcher97, @irifar${Toast(
    "username already taken",
    "username-taken-toast",
    "red"
    )}
    ${Toast("succesfully logged in", "successful-login-toast", "green")}ac & @dbekic</b>
    

        `;
}

export default LoginLayout