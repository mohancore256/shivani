import { User } from 'src/app/user/model/user';

export class Project {
    projectId:string;

    projectName:string;
    
    startDate:Date;

    endDate:Date;

    priority:number;
    
    manager :string;
    
    status:string;

    users:User[];
}
