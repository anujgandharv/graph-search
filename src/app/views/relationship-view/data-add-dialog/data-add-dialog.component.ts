import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { MD_DIALOG_DATA } from '@angular/material';

declare let vis: any;

@Component({
	selector: 'data-add-dialog',
	templateUrl: './data-add-dialog.component.html',
	styleUrls: ['./data-add-dialog.component.css'],
})
export class DataAddDialog {
	private title = "Add New Data";

	constructor(@Inject(MD_DIALOG_DATA) public data: any) {
	}
}