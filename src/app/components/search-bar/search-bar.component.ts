import { Component , Input , Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() onSearch : EventEmitter<any> = new EventEmitter<any>();

  backColor = "#f1f1f1";
  foreColor = "#CCC";
  searchText = "";
  isVisible = false;
  selIndex = -1;
  fontStyle = "italic";
  placeholder = "Search Something";

  searchList = [];

  filteredData = [];

  doSearch() {
    if(this.searchText == '' || this.searchText == undefined) {
      this.isVisible = false;
    } else if(this.selIndex == -2) {
      this.isVisible = false;
      this.selIndex = -1;
    } else {
      this.isVisible = true;
    }

    this.filteredData = [];
    for(var i = 0; i < this.searchList.length; i++) {
      let chkStr = this.searchText.toLowerCase();
      let srhStr = this.searchList[i].toLowerCase();
      if(srhStr.indexOf(chkStr) != -1) {
        this.filteredData.push(this.searchList[i]);
      }
    }

    if(this.filteredData.length == 0) {
      this.isVisible = false;
    }
    // console.log("doSearch", this.isVisible);
  }

  ngOnInit() {
  }

  focusIn() {
    this.backColor = "#FFF";
    this.foreColor = "#666";
    this.fontStyle = 'normal';
    this.placeholder = "";
    // console.log("FOCUS IN");
  }

  focusOut() {
    this.backColor = "#f1f1f1";
    this.isVisible = false;
    if(this.searchText != null && this.searchText != "") {
      this.foreColor = "#888";
    } else {
      this.foreColor = "#CCC";      
    }

    this.fontStyle = 'italic';
    this.placeholder = "Search a Topic";
    // console.log("FOCUS OUT");
  }

  keyDown(event) {
    // console.log("KEY DOWN", event);
    if (event.keyCode == 13) {
      if(this.selIndex > -1 && this.selIndex < this.filteredData.length) {
        this.searchText = this.filteredData[this.selIndex];
      }
      this.isVisible = false;
      this.selIndex = -2;
      this.didSelected();
    } else if (event.keyCode == 38) {
      if(this.filteredData.length != 0) {
        this.selIndex = (this.selIndex - 1 + this.filteredData.length) % this.filteredData.length;        
      }
      this.searchText = this.filteredData[this.selIndex];
    } else if (event.keyCode == 40) {
      if(this.filteredData.length != 0) {
        this.selIndex = (this.selIndex + 1) % this.filteredData.length;        
      }
      this.searchText = this.filteredData[this.selIndex];
    }
  }

  isSelected(index) {
    if(index == this.selIndex) {
      return '#e8f5ff';
    } else {
      return 'transparent';
    }
  }

  overItem(index) {
    console.log(index);
    this.selIndex = index;
  }

  didSelected() {
    var result = {
      text: this.searchText,
    };
    this.onSearch.emit(result);
  }

  selectItem(item) {
    console.log("ITEM SELECTED", item);
    this.searchText = item;
    this.didSelected();
  }
}