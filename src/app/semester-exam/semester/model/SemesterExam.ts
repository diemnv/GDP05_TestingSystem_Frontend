import { User } from './User';
import { SemesterExamCode } from './SemesterExamCode';

export interface SemesterExam {
   id: string;
   name: string;
   description: string;
   user: User;
   status: number;
   startTime: Date;
   endTime: Date;
   semesterExamCode:SemesterExamCode[];
}

