import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { MD_DIALOG_DATA } from '@angular/material';

declare let vis: any;

@Component({
	selector: 'tabular-edit-dialog',
	templateUrl: './tabular-edit-dialog.component.html',
	styleUrls: ['./tabular-edit-dialog.component.css'],
})
export class TabularEditDialog {
	private title = "Add New Node";

	constructor(@Inject(MD_DIALOG_DATA) public data: any) {
		if(!data.isAdd) {
			this.title = "Update Node";
		}
	}
}