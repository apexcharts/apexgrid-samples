import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { ColumnConfiguration } from "apex-grid";
import { createProductInfo, ProductInfo } from "./mock-data";

const formatter = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "EUR"
});

abstract class Base extends LitElement {
  static styles = [
    css`
      :host {
        contain: content;
        --ig-size: 2;
      }
      apex-grid {
        min-height: 400px;
      }
    `
  ];

  protected format = (params: any) => formatter.format(params.value);

  @state()
  protected data: ProductInfo[] = Array.from({ length: 50 }, () =>
    createProductInfo()
  );

  @state()
  protected columns: ColumnConfiguration<ProductInfo>[] = [
    { key: "name", headerText: "Product Name" },
    {
      key: "price",
      headerText: "Price",
      type: "number",
      cellTemplate: this.format
    },
    { key: "sold", type: "number", headerText: "Units sold" },
    { key: "total", headerText: "Total sold", cellTemplate: this.format },
    {
      key: "rating",
      type: "number",
      headerText: "Customer rating",
      cellTemplate: ({ value }) => html` <igc-rating
        readonly
        step="0.01"
        value=${value}
      ></igc-rating>`
    }
  ];
}

@customElement("column-config-basic")
export class ColumnConfigurationBasic extends Base {
  protected render() {
    return html`<apex-grid
      .columns=${this.columns}
      .data=${this.data}
    ></apex-grid>`;
  }
}
