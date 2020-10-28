import { restApiUrl } from "../shared/urls";
import { LessonWithSubject } from "../models/LessonWithSubject";

class TimetableService {
  static async getTimeTable(studentId: string): Promise<LessonWithSubject[]> {
    const url : string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/student/${studentId}/timetable`
    const response = await fetch(
      url
    );
    return (await response.json()) as LessonWithSubject[];
  }
  // static getTimeTable(studentId: string): LessonWithSubject[] {}
}

export default TimetableService;
