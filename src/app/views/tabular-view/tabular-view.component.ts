import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TabularEditDialog } from './tabular-view-dialog/tabular-edit-dialog.component';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog.component';

import { environment } from '../../../environments/environment';

declare let vis: any;

@Component({
	selector: 'tabular-view',
	templateUrl: './tabular-view.component.html',
	styleUrls: ['./tabular-view.component.css'],
})
export class TabularViewComponent {
	@Input() nodes: any;
	
	private activeItem = "";
	private activeNode: any = {};	
	private activeData: any = [];


	constructor(private http: Http, public dialog: MdDialog) {}

	ngOnChanges(changes) {
		this.activeItem = this.nodes[0].id;
		this.activeNode = this.nodes[0];
		this.refreshData();
	}

	onNodeItem(item) {
		this.activeItem = item.id;
		for(var i = 0; i < this.nodes.length; i++) {
			if(this.nodes[i].id == item.id) {
				this.activeNode = this.nodes[i];
				break;
			}
		}

		this.refreshData();		
	}

	refreshData() {
		var keys = Object.keys(this.activeNode.data);
		this.activeData = [];
		for(var i = 0; i < keys.length; i++) {
			var obj = {
				key: keys[i],
				value: this.activeNode.data[keys[i]],
			};
			this.activeData.push(obj);
		}
	}

	onAdd() {
		var add = {
			key: "",
			value: "",
		};

		let dialogRef = this.dialog.open(TabularEditDialog, {
			data: add
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false && result != undefined) {
				var url = environment.apiURL + "/node/data";
				var body = {
					id: this.activeNode.id,
					type: this.activeNode.type,
					key_name: result.key,
					key_value: result.value,
					action: "add"
				};

				// Get nodes and edges..
				this.http.put(url, body).subscribe(
					response => {
						console.log("[tabular-view] \n Success on add:", response);

						this.activeNode.data.push(result);
					},
					err => {
						console.log("[tabular-view] \n Error on add:", err);
					}
				);

			} else {
				console.log("Cancel");
			}
		});
	}

	onEdit(item) {
		var update = {
			isAdd: false,
			key: item.key,
			value: item.value,
		};

		let dialogRef = this.dialog.open(TabularEditDialog, {
			data: update
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false && result != undefined) {
				var url = environment.apiURL + "/node/data";
				var body = {
					id: this.activeNode.id,
					type: this.activeNode.type,
					key_name: result.key,
					key_value: result.value,
					action: "edit"
				};

				// Get nodes and edges..
				this.http.put(url, body).subscribe(
					response => {
						console.log("[tabular-view] \n Success on update:", response);
						item.value = result.value;
						item.key = result.key;
					},
					err => {
						console.log("[tabular-view] \n Error on update:", err);
					}
				);

			} else {
				console.log("Cancel");
			}
		});
	}

	onDelete(item, idx) {
		console.log(this.activeNode, idx);

		let dialogRef = this.dialog.open(ConfirmDialog);
		dialogRef.afterClosed().subscribe(result => {
			if(result == true) {
				var body = {
					id: this.activeNode.id,
					type: this.activeNode.type,
					key_name: item.key,
					key_value: item.value,
					action: "delete"
				};
				var url = environment.apiURL + "/node/data";
				console.log(url);

				// Delete item..
				this.http.put(url, body).subscribe(
					response => {
						console.log("[tabular-view] \n Success on delete:", response);
						delete this.activeNode.data[item.key];
						this.activeData.splice(idx, 1);
					},
					err => {
						console.log("[tabular-view] \n Error on delete:", err);
					}
				);

			} else {
				console.log("Cancel");
			}
		});
	}
}

