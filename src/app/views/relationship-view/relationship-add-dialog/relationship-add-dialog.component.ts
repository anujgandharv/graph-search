import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { MD_DIALOG_DATA } from '@angular/material';

declare let vis: any;

@Component({
	selector: 'relationship-add-dialog',
	templateUrl: './relationship-add-dialog.component.html',
	styleUrls: ['./relationship-add-dialog.component.css'],
})
export class RelationshipAddDialog {
	constructor(@Inject(MD_DIALOG_DATA) public data: any) {}
}