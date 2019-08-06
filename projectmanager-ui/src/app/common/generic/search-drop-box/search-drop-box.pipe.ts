import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/user/model/user';
import { Project } from 'src/app/project/model/project';

@Pipe({
  name: 'combo-box-filter'
})
export class ComboBoxPipe implements PipeTransform{

  transform(dataToSort: User[], columnNameToSort:string, stringToSort: string):any[]{
    let sortedData:User[];
    sortedData = [];
    for(var i =0; i<dataToSort.length; ++i){
      if(dataToSort[i][columnNameToSort].search(stringToSort)>-1) {
        sortedData.push(dataToSort[i]);
      }
    }

    return sortedData; 
  }

  transformProject(dataToSort: Project[], columnNameToSort:string, stringToSort: string):any[]{
    let sortedData:Project[];
    sortedData = [];
    for(var i =0; i<dataToSort.length; ++i){
      if(dataToSort[i][columnNameToSort].search(stringToSort)>-1) {
        sortedData.push(dataToSort[i]);
      }
    }

    return sortedData; 
  }

}