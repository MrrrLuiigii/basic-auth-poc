import { html } from "lit-element";
import { BaseView } from "../views/base-view.js";

class ExampleComponent extends BaseView {
  static get properties() {
    return {};
  }

  render() {
    return html`
      <div>This is an ExampleComponent</div>

      <style></style>
    `;
  }
}

customElements.define("example-component", ExampleComponent);
