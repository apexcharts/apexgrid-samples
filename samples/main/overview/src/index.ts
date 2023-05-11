import { defineComponents, IgcRatingComponent, IgcCheckboxComponent, IgcSelectComponent } from 'igniteui-webcomponents'
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ApexGrid, ColumnConfiguration } from "apex-grid";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { User, createUser } from './mock-data';

ApexGrid.register();

defineComponents(IgcRatingComponent, IgcCheckboxComponent, IgcSelectComponent)

const choices = ['Low', 'Standard', 'High'];

@customElement('app-sample-main')
export class Main extends LitElement {
  static styles = css`
    :host {
      contain: strict;
      min-height: 400px;
      --ig-size: 1;
    }
    apex-grid {
      min-height: 400px;
    }
  `;

  @state()
  protected data: User[] = Array.from({ length: 1e3 }, () => createUser());

  @state()
  protected columns: ColumnConfiguration<User>[] = [
    {
      key: 'avatar',
      width: '85px',
      headerText: 'Avatar',
      cellTemplate: ({ value }) => html` <igc-avatar
        shape="circle"
        alt="User avatar"
        .src=${value}
      ></igc-avatar>`,
    },
    {
      key: 'firstName',
      headerText: 'First name',
      sort: true,
      filter: true,
      resizable: true,
    },
    {
      key: 'lastName',
      headerText: 'Last name',
      sort: true,
      filter: true,
      resizable: true,
    },
    {
      key: 'email',
      headerText: 'Email Address',
    },
    {
      key: 'priority',
      headerText: 'Priority',
      width: '175px',
      sort: {
        comparer: (a, b) => choices.indexOf(a) - choices.indexOf(b),
      },
      cellTemplate: ({ value }) => html`
        <igc-select outlined .value=${value} flip
          >${choices.map(
            (choice) =>
              html`<igc-select-item .value=${choice}
                >${choice}</igc-select-item
              >`
          )}</igc-select
        >
      `,
    },
    {
      key: 'satisfaction',
      headerText: 'Satisfaction rating',
      type: 'number',
      sort: true,
      filter: true,
      cellTemplate: ({ value }) =>
        html`<igc-rating readonly .value=${value}></igc-rating>`,
    },
    {
      key: 'registeredAt',
      headerText: 'Registered @',
      sort: true,
      cellTemplate: ({ value }) => html`${value.toLocaleString()}`,
    },
    {
      key: 'active',
      type: 'boolean',
      width: '82px',
      headerText: 'Active',
      cellTemplate: ({ value }) =>
        html`<igc-checkbox ?checked=${value}></igc-checkbox>`,
    },
  ];

  protected render() {
    return html`<apex-grid
      .columns=${this.columns}
      .data=${this.data}
    ></apex-grid>`;
  }
}