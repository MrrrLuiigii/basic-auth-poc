import { html } from "lit-element";
import { BaseView } from "./base-view.js";

import "../components/api-call-component.js";

class LoginView extends BaseView {
  static get properties() {
    return {
      token: String,
      publicRoute: {
        security: String,
        url: String,
      },
      privateRoute: {
        security: String,
        url: String,
      },
    };
  }

  constructor() {
    super();
    this.token = "";
    this.publicRoute = {
      security: "Public",
      url: "http://localhost:3000/public",
    };
    this.privateRoute = {
      security: "Private",
      url: "http://localhost:3000/private",
    };
  }

  login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    this.token = `Basic ${btoa(`${username}:${password}`)}`;
  }

  logout() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    this.token = "";
  }

  render() {
    return html`
      <div class="container">
        <div class="form">
          <h3>Basic Auth login</h3>
          <input id="username" class="customInput" placeholder="username" />
          <input
            id="password"
            class="customInput"
            placeholder="password"
            type="password"
          />
          <button
            class="customButton flexButton"
            @click="${() => this.login()}"
          >
            Login
          </button>
          <button
            class="customButton flexButton"
            @click="${() => this.logout()}"
          >
            Logout
          </button>
        </div>

        <api-call-component
          security="${this.publicRoute.security}"
          url="${this.publicRoute.url}"
        ></api-call-component>
        <api-call-component
          token="${this.token !== "" ? this.token : ""}"
          security="${this.privateRoute.security}"
          url="${this.privateRoute.url}"
        ></api-call-component>
      </div>

      <style></style>
    `;
  }
}

customElements.define("login-view", LoginView);
