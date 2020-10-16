import { html } from "lit-element";
import { BaseView } from "../views/base-view.js";
import axios from "axios";

class ApiCallComponent extends BaseView {
  static get properties() {
    return {
      token: String,
      security: String,
      url: String,
      response: Object,
    };
  }

  constructor() {
    super();
    this.response = undefined;
    this.error = undefined;
  }

  doApiCall() {
    const self = this;
    if (this.security === "Public") {
      axios
        .get(this.url)
        .then((res) => {
          self.response = {
            success: res.data.success,
            message: res.data.message,
          };
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .get(this.url, {
          headers: {
            authorization: this.token,
          },
        })
        .then((res) => {
          self.response = {
            success: res.data.success,
            message: res.data.message,
            user: res.data.user,
          };
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render() {
    return html`
      <div class="form">
        <h3>${this.security} Route</h3>
        <p>URL: ${this.url}</p>
        <div>
          ${this.security === "Private"
            ? this.token !== ""
              ? html`<p>Authenticated!</p>`
              : html`<p>Login to access this route!</p>`
            : html``}
        </div>

        <div>
          ${!!this.response
            ? this.security === "Public"
              ? html`
                  <div>
                    Succes: ${this.response.success ? html`true` : html`false`}
                  </div>
                  <div>Message: ${this.response.message}</div>
                `
              : html`
                  <div>
                    Succes: ${this.response.success ? html`true` : html`false`}
                  </div>
                  <div>Message: ${this.response.message}</div>
                  <div>
                    <div>User:</div>
                    <div>Id: ${this.response.user.id}</div>
                    <div>Username: ${this.response.user.username}</div>
                    <div>Firstname: ${this.response.user.firstName}</div>
                    <div>Lastname: ${this.response.user.lastName}</div>
                  </div>
                `
            : html``}
        </div>

        <div>
          ${!!this.error
            ? html`
                <div>
                  <div>Error: ${this.error.message}</div>
                </div>
              `
            : html``}
        </div>

        <button
          class="customButton flexButton"
          @click="${() => this.doApiCall()}"
        >
          Call API
        </button>
      </div>

      <style></style>
    `;
  }
}

customElements.define("api-call-component", ApiCallComponent);
