import { SubjectDto } from "./Subject";

export interface LessonWithSubject {
  id: string;
  subject: SubjectDto;
  week: number;
  dayOfWeek: number;
  timeStart: string;
  type: string;
}
