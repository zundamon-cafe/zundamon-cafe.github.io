import { LitElement, html, css } from 'lit';
import yaml from 'js-yaml';

customElements.define('staff-list', class extends LitElement {
	static styles = css`
		.comment {
			/* Rounded M+ のシャギー防止 */
			transform: rotate(0.03deg);
		}
		
		table {
			display: contents;
		}

		thead {
			display: none;
		}

		tbody {
			display: flex;
			gap: var(--staff-gap);
			flex-wrap: wrap;
			justify-content: center;
		}

		tr {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: var(--staff-width);
			max-width: 100%;
		}

		td {
			display: block;
		}

		.picture {
			order: -1;
			background: #EDFFAB;
			border-radius: 1.5rem;
			aspect-ratio: 1 / 2;
			max-height: 100vh;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			padding: 1em;
		}

		.picture img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}

		.name {
			font-size: 2em;
			text-align: center;
		}
	`;

	static properties = {
		staffs: { type: Array },
	};

	constructor()
	{
		super();

		if (!this.staffs) {
			this.staffs = [ ];
			(async () => {
				this.staffs = yaml.load(await (await fetch('/staffs.yaml')).text());
			})();
		}
	}

	render()
	{
		return html`<table>
			<thead>
				<tr>
					<th>立ち絵</th>
					<th>名前</th>
					<th>コメント</th>
				</tr>
			</thead>
			<tbody>${this.staffs && this.staffs.map(staff => html`<tr>
				<th class="name">${staff.name}</th>
				<td class="picture"><img src="images/${staff.picture}" /></td>
				<td class="comment">${staff.comment}</td>
			</tr>`)}</tbody>
		</table>`;
	}
});
