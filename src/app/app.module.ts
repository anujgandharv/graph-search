import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { MdDialogModule, MdInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Tabs } from './components/tabs/tabs.component';
import { Tab } from './components/tab/tab.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';

import { GraphViewComponent } from './views/graph-view/graph-view.component';
import { TabularViewComponent } from './views/tabular-view/tabular-view.component';
import { TabularEditDialog } from './views/tabular-view/tabular-view-dialog/tabular-edit-dialog.component';
import { RelationshipViewComponent } from './views/relationship-view/relationship-view.component';
import { RelationshipAddDialog } from './views/relationship-view/relationship-add-dialog/relationship-add-dialog.component';
import { RelationshipEditDialog } from './views/relationship-view/relationship-edit-dialog/relationship-edit-dialog.component';
import { DataAddDialog } from './views/relationship-view/data-add-dialog/data-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    Tab,
    Tabs,
    SearchBarComponent,
    GraphViewComponent,
    TabularViewComponent,
    TabularEditDialog,
    ConfirmDialog,
    RelationshipViewComponent,
    RelationshipAddDialog,
    RelationshipEditDialog,
    DataAddDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdInputModule,
  ],
  entryComponents: [
    TabularEditDialog,
    ConfirmDialog,
    RelationshipAddDialog,
    RelationshipEditDialog,
    DataAddDialog,    
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
