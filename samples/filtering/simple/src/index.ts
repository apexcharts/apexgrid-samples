import { ApexGrid } from "apex-grid";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import Base from "./base";

ApexGrid.register();

@customElement("filter-config-simple")
export default class extends Base {
  protected render() {
    return html`<apex-grid
      .data=${this.data}
      .columns=${this.columns}
    ></apex-grid>`;
  }
}
