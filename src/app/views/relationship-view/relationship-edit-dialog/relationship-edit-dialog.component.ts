import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { MD_DIALOG_DATA } from '@angular/material';

declare let vis: any;

@Component({
	selector: 'relationship-edit-dialog',
	templateUrl: './relationship-edit-dialog.component.html',
	styleUrls: ['./relationship-edit-dialog.component.css'],
})
export class RelationshipEditDialog {
	constructor(@Inject(MD_DIALOG_DATA) public data: any) {}
}