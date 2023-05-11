import { defineComponents, IgcRatingComponent } from "igniteui-webcomponents";
import { ColumnConfiguration } from "apex-grid";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { createProductInfo, ProductInfo } from "./mock-data";
import "igniteui-webcomponents/themes/light/bootstrap.css";

defineComponents(IgcRatingComponent);

export default class extends LitElement {
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

  @state()
  protected data: ProductInfo[] = Array.from({ length: 100 }, () =>
    createProductInfo()
  );

  @state()
  protected columns: ColumnConfiguration<ProductInfo>[] = [
    { key: "name", headerText: "Name", sort: true },
    { key: "price", type: "number", headerText: "Price", sort: true },
    {
      key: "rating",
      type: "number",
      headerText: "Rating",
      sort: true,
      cellTemplate: ({ value }) => html`<igc-rating
        readonly
        step="0.01"
        value=${value}
      ></igc-rating>`
    },
    { key: "sold", type: "number", headerText: "Sold", sort: true },
    { key: "total", type: "number", headerText: "Total", sort: true }
  ];
}
