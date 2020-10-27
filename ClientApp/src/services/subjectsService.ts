import {restApiUrl} from "../shared/urls";
import {SubjectDto} from "../models/Subject";

export class subjectsService {
    static async getSubjects(studentId :string):Promise<SubjectDto[]>{
        const url : string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/student/${studentId}/subject?withRequired=false`
        const response = await fetch(
            url
        );
        return (await response.json()) as SubjectDto[];
    }
    
    static async updateSubjects(studentId :string,subjects : string[]){
        const url : string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/student/${studentId}`
        return await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(subjects)
        });
    }
    
    static  async  getSubjectsToChoice(studentId :string){
        const url : string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/student/${studentId}/subject/choice`
        const response = await fetch(
            url
        );
        return (await response.json()) as SubjectDto[];
    }
 }