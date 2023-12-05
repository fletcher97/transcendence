import Spinner from "../../../../components/spinner.js";
import AbstractView from "../AbstractView.js";
import Home from "../Home.js";
import { GuestLoginView } from "./GuestLoginView.js";
import { SignInView } from "./SignInView.js";
// import Home from "./Home.js";

export default class LoginView extends AbstractView {
  constructor() {
    super();
    this.startListening();
  }

  startListening() {
    this.initialRender();
  }

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    await GuestLoginView(); // Update the content with new HTML
  }
}
