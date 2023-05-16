import {
  defineComponents,
  IgcCheckboxComponent,
  IgcDropdownComponent,
  IgcSwitchComponent
} from "igniteui-webcomponents";
import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { ApexGrid, ColumnConfiguration } from "apex-grid";
import type { ProductInfo } from "./mock-data";
import { ColumnConfigurationBasic } from "./simple";
import "igniteui-webcomponents/themes/light/bootstrap.css";

ApexGrid.register();
defineComponents(
  IgcCheckboxComponent,
  IgcDropdownComponent,
  IgcSwitchComponent
);

@customElement("column-config-dynamic")
export class ColumnConfigurationDynamic extends ColumnConfigurationBasic {
  static styles = [
    ...ColumnConfigurationBasic.styles,
    css`
      #panel {
        margin: 1rem 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
      }
      .config-key {
        flex: 2 1 25% !important;
        font-weight: bold;
      }
      .config {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.75rem;
      }
      .config * {
        flex: 1;
      }
    `
  ];

  @query(ApexGrid.is)
  protected grid!: ApexGrid<ProductInfo>;

  @query(IgcDropdownComponent.tagName)
  protected dropdown!: IgcDropdownComponent;

  @state()
  protected hasFormatters = true;

  @state()
  protected columns = [
    { key: "id", hidden: true, headerText: "ID" },
    ...super.columns
  ].map((each) =>
    Object.assign(each, { width: "15rem" })
  ) as ColumnConfiguration<ProductInfo>[];

  #handleFormattersChange({ detail }: CustomEvent<boolean>) {
    this.grid.updateColumns(
      ["price", "total"].map((key) => ({
        key,
        cellTemplate: detail ? this.format : undefined
      })) as ColumnConfiguration<ProductInfo>[]
    );
  }

  #renderCheckbox(
    prop: keyof ColumnConfiguration<ProductInfo>,
    config: ColumnConfiguration<ProductInfo>
  ) {
    const label = `${prop.substring(0, 1).toUpperCase()}${prop.substring(1)}`;
    return html`
      <igc-checkbox
        @igcChange=${({ detail }: CustomEvent<boolean>) =>
          this.grid.updateColumns({ key: config.key, [prop]: detail })}
        label-position="before"
        ?checked=${config[prop] as boolean}
        >${label}</igc-checkbox
      >
    `;
  }

  #renderDropdownItem = (config: ColumnConfiguration<ProductInfo>) => {
    const content: Array<keyof typeof config> = [
      "hidden",
      "resizable",
      "filter",
      "sort"
    ];

    return html`
      <igc-dropdown-item>
        <div class="config">
          <span class="config-key">${config.headerText ?? config.key}</span>
          ${content.map((prop) => this.#renderCheckbox(prop, config))}
        </div>
      </igc-dropdown-item>
    `;
  };

  #renderPanel() {
    return html`
      <section id="panel">
        <igc-dropdown
          keep-open-on-select
          flip
          @igcChange=${() => this.dropdown.clearSelection()}
        >
          <igc-button slot="target" variant="outlined"
            >Column properties</igc-button
          >
          ${this.columns.map(this.#renderDropdownItem)}
        </igc-dropdown>
        <igc-switch
          label-position="before"
          ?checked=${this.hasFormatters}
          @igcChange=${this.#handleFormattersChange}
          >Value formatters:</igc-switch
        >
      </section>
    `;
  }

  protected render() {
    return html`
      <section>
        ${this.#renderPanel()}
        <apex-grid .columns=${this.columns} .data=${this.data}></apex-grid>
      </section>
    `;
  }
}
