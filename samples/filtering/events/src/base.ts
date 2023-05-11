import type { ColumnConfiguration } from "apex-grid";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { createUser, User } from "./mock-data";

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
  protected data: User[] = Array.from({ length: 50 }, () => createUser());

  @state()
  protected columns: ColumnConfiguration<User>[] = [
    { key: "firstName", headerText: "First name", filter: true },
    { key: "lastName", headerText: "Last name", filter: true },
    { key: "age", headerText: "Age", filter: true, type: "number" },
    {
      key: "active",
      headerText: "Active",
      type: "boolean",
      filter: true,
      cellTemplate: ({ value }) =>
        html`<igc-checkbox .checked=${value}></igc-checkbox>`
    }
  ];
}
