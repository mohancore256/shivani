import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { ComboBoxPipe } from './search-drop-box.pipe';
import { User } from 'src/app/user/model/user';

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  TAB_KEY = 9
}

@Component({
  selector: 'app-search-drop-box',
  templateUrl: './search-drop-box.component.html',
  styleUrls: ['./search-drop-box.component.css'],
  providers: [ComboBoxPipe]
})
export class SearchDropBoxComponent implements OnInit {

  @Input()
  dataList: User[];

  @Input()
  columnName: string;

  @Output()
  selectedUser = new EventEmitter<User>();

  dummyDataList: User[];
  showDropDown: boolean;
  textToSort: string;

  constructor(private ComboBoxPipe: ComboBoxPipe) {
    this.reset();
  }

  ngOnInit() {
    this.reset();
  }

  onKeyDownAction(): void {
    this.showDropDown = true;
  }
  reset(): void {
    this.showDropDown = false;
    this.dummyDataList = this.dataList;
  }

  textChange(value) {
    this.dummyDataList = [];
    if (value.length > 0) {
      this.dummyDataList = this.ComboBoxPipe.transform(this.dataList, this.columnName, value);
      if (this.dummyDataList) {
        this.showDropDown = true;
      }
    } else {
      this.reset();
    }
  }

  updateTextBox(valueSelected) {
    this.textToSort = valueSelected[this.columnName];
    this.selectedUser.emit(valueSelected);
    this.showDropDown = false;
  }


}