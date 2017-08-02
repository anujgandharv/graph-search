import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RelationshipAddDialog } from './relationship-add-dialog/relationship-add-dialog.component';
import { RelationshipEditDialog } from './relationship-edit-dialog/relationship-edit-dialog.component';
import { TabularEditDialog } from '../tabular-view/tabular-view-dialog/tabular-edit-dialog.component';
import { DataAddDialog } from './data-add-dialog/data-add-dialog.component';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog.component';

import { environment } from '../../../environments/environment';

declare let vis: any;

@Component({
	selector: 'relationship-view',
	templateUrl: './relationship-view.component.html',
	styleUrls: ['./relationship-view.component.css'],
})
export class RelationshipViewComponent {
	@Input() nodes: any;
	@Input() edges: any;

	private dataList: any;
	private nodeDict: any;
	

	constructor(private http: Http, public dialog: MdDialog) {}

	ngOnChanges(changes) {
		this.nodeDict = {};
		for(var i = 0; i < this.nodes.length; i++) {
			var node = this.nodes[i];
			this.nodeDict[node.id] = node;
		}

		this.dataList = [];
		for(var i = 0; i < this.edges.length; i++) {
			var edge = this.edges[i];

			var data = [];
			if(edge.data != null) {
				var keys = Object.keys(edge.data);
				for(var j = 0; j < keys.length; j++) {
					var key = keys[j];
					var keyData = {
						key: key,
						value: edge.data[key],
					};
					data.push(keyData);
				}
			}

			var obj = {
				id: edge.id,
				from: this.nodeDict[edge.from].label,
				to: this.nodeDict[edge.to].label,
				label: edge.label,
				internalType: edge.internalType,
				data: data,
				isExpanded: false,
			};

			this.dataList.push(obj);
		}

		console.log("DATA LIST", this.dataList);
	}

	onExpand(item) {
		item.isExpanded = true;
	}

	onCollapse(item) {
		item.isExpanded = false;
	}

	onAddRelation() {
		var add = {
			from: '',
			to: '',
			label: '',
		};

		let dialogRef = this.dialog.open(RelationshipAddDialog, {
			data: add
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log("DATA", result);

			if(result != false && result != undefined) {
				var url = environment.apiURL + "/relationship";
				var body = {
					source_ref: result.from,
					target_ref: result.to,
					relationship_type: result.label,
				};

				// Get nodes and edges..
				this.http.post(url, body).subscribe(
					response => {
						console.log("[relationship-view] \n Success on add:", response);
					},
					err => {
						console.log("[relationship-view] \n Error on add:", err);
					}
				);

			} else {
				console.log("Cancel");
			}
		});
	}

	onEditRelation(item) {
		var update = {
			id: item.id,
			from: item.from,
			to: item.to,
			internalType: item.internalType,
			isExpanded: item.isExpanded,
			label: item.label,
		};

		let dialogRef = this.dialog.open(RelationshipEditDialog, {
			data: update
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log("DATA", result);

			if(result != false && result != undefined) {
				var url = environment.apiURL + "/relationship/data";
				var body = {
					id: result.id,
					source_ref: result.from,
					target_ref: result.to,
					relationship_type: result.label,
				};

				// Get nodes and edges..
				this.http.put(url, body).subscribe(
					response => {
						console.log("[relationship-view] \n Success on update:", response);
						item.label = result.label;
					},
					err => {
						console.log("[relationship-view] \n Error on update:", err);
					}
				);

			} else {
				console.log("Cancel");
			}
		});
	}

	onDeleteRelation(item, idx) {
		let dialogRef = this.dialog.open(ConfirmDialog);
		dialogRef.afterClosed().subscribe(result => {
			if(result == true) {
				var url = environment.apiURL + "/relationship/" + item.id;
				console.log("URL", url);

				// Get nodes and edges..
				this.http.delete(url).subscribe(
					response => {
						console.log("[tabular-view] \n Success on delete:", response);
						this.dataList.splice(idx, 1);
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

	onEditItem(row, item) {
		var update = {
			key: item.key,
			value: item.value,
		};

		let dialogRef = this.dialog.open(TabularEditDialog, {
			data: update
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false && result != undefined) {
				var url = environment.apiURL + "/relationship/data";
				var body = {
					id: row.id,
					key: item.key,
					value: item.value,
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

	onDeleteItem(row, item) {
		let dialogRef = this.dialog.open(ConfirmDialog);
		dialogRef.afterClosed().subscribe(result => {
			if(result == true) {
				console.log("DATA", result);

				var id = '123';
				var key = "value";
				var url = environment.apiURL + "/relationship/data";
				var body = {
					id: row.id,
					key: item.key,
					value: item.value,
					action: "delete"
				};

				// Get nodes and edges..
				this.http.delete(url).subscribe(
					response => {
						console.log("[tabular-view] \n Success on delete:", response);
						var result = response.json();
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

	onAddData(row) {
		var add = {
			id: new Date().getTime(),
			key: "",
			value: "",
		};

		let dialogRef = this.dialog.open(DataAddDialog, {
			data: add,
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false && result != undefined) {
				var url = environment.apiURL + "/relationship/data";
				var body = {
					id: row.id,
					key_name: result.key,
					key_value: result.value,
					action: "add"
				};

				// Get nodes and edges..
				this.http.put(url, body).subscribe(
					response => {
						console.log("[tabular-view] \n Success on add:", response);
						row.data.push(result);
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

}

