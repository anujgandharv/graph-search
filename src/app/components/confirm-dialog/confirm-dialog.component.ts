import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { MD_DIALOG_DATA } from '@angular/material';

declare let vis: any;

@Component({
	selector: 'confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialog {
}