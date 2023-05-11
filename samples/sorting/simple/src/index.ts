import { ApexGrid } from "apex-grid";
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { ProductInfo } from "./mock-data";
import Base from "./base";

ApexGrid.register();

@customElement("sort-config-simple")
export default class extends Base {
  @query(ApexGrid.is)
  protected grid!: ApexGrid<ProductInfo>;

  firstUpdated() {
    this.grid.updateColumns({
      key: "name",
      sort: { comparer: (a, b) => a.length - b.length }
    });
  }

  protected render() {
    return html`<apex-grid
      .columns=${this.columns}
      .data=${this.data}
    ></apex-grid>`;
  }
}
