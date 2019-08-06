import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ComboBoxPipe } from '../search-drop-box/search-drop-box.pipe';
import { Project } from 'src/app/project/model/project';

@Component({
  selector: 'app-search-drop-box-project',
  templateUrl: './search-drop-box-project.component.html',
  styleUrls: ['./search-drop-box-project.component.css'],
  providers: [ComboBoxPipe]
})
export class SearchDropBoxProjectComponent implements OnInit {

  @Input()
  dataList: Project[];

  @Input()
  columnName: string;

  @Output()
  selectedProject = new EventEmitter<Project>();

  dummyDataList: Project[];
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
      this.dummyDataList = this.ComboBoxPipe.transformProject(this.dataList, this.columnName, value);
      if (this.dummyDataList) {
        this.showDropDown = true;
      }
    } else {
      this.reset();
    }
  }

  updateTextBox(valueSelected) {
    this.textToSort = valueSelected[this.columnName];
    this.selectedProject.emit(valueSelected);
    this.showDropDown = false;
  }

}
