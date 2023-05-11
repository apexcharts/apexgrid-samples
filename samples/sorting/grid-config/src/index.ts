import { defineComponents, IgcSwitchComponent } from "igniteui-webcomponents";
import { ApexGrid, GridSortConfiguration } from "apex-grid";
import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import Base from "./base";
import "igniteui-webcomponents/themes/light/bootstrap.css";

ApexGrid.register();
defineComponents(IgcSwitchComponent);

@customElement("sort-config-grid")
export default class extends Base {
  static styles = [
    ...Base.styles,
    css`
      section {
        margin: 1rem 0;
      }
    `
  ];

  #updateConfig(event: CustomEvent<boolean>) {
    const target = event.target as Element;
    const [prop, value] = [target.getAttribute("id") ?? "", event.detail];
    Object.assign(this.sortConfig, { [prop]: value });
  }

  protected renderConfigPanel() {
    return html`<section>
      <igc-switch
        id="multiple"
        .checked=${this.sortConfig.multiple}
        @igcChange=${this.#updateConfig}
        >Enable multi-sort</igc-switch
      >
      <igc-switch
        id="triState"
        .checked=${this.sortConfig.triState}
        @igcChange=${this.#updateConfig}
        >Enable tri-state sorting</igc-switch
      >
    </section>`;
  }

  @state()
  protected sortConfig: GridSortConfiguration = {
    multiple: true,
    triState: true
  };

  protected render() {
    return html`${this.renderConfigPanel()}<apex-grid
        .columns=${this.columns}
        .data=${this.data}
        .sortConfiguration=${this.sortConfig}
      ></apex-grid>`;
  }
}
