import { Project } from 'src/app/project/model/project';
import { User } from 'src/app/user/model/user';

export class Task {

    taskId : number;

    parentId :number;

    projectId : number;

    taskName : string;

    startDate :Date;

    endDate : Date;

    priority :number;

    users:User[];
    projects:Project;

}
