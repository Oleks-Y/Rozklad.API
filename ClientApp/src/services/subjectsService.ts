import {restApiUrl} from "../shared/urls";
import {SubjectDto} from "../models/Subject";

export class subjectsService {
    static async getSubjects(studentId: string): Promise<SubjectDto[]> {
        const url: string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/student/${studentId}/subject?withRequired=false`
        const response = await fetch(
            url
        );
        return (await response.json()) as SubjectDto[];
    }

    static async updateSubjects(studentId: string, subjects: string[]) {
        const url: string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/student/${studentId}`
        const body =
            [
                {
                    "op": "add",
                    "path": "/Subjects",
                    "value": subjects
                }
            ]
        
        const result = await fetch(url, {
            method: "PATCH",
            body:JSON.stringify(body),
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        return result
    }

    static async getSubjectsToChoice(studentId: string) {
        const url: string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/student/${studentId}/subject/choice`
        const response = await fetch(
            url
        );
        return (await response.json()) as SubjectDto[];
    }
    
    static  async  updateSubjectLinks(type : string, link : string, subjectId : string){
        const url: string = `${window.location.protocol}//${window.location.host}/${restApiUrl}/subject/${subjectId}`
        const body =
            [
                {
                    "op": "add",
                    "path": type==="Лек"? "/lessonsZoom":"/labsZoom",
                    "value": [
                        {
                            "url": link,
                            "accessCode": ""
                        }
                    ]
                }
            ]
        const result = await  fetch(
            url, {
                method: "PATCH",
                body:JSON.stringify(body),
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            }
        )
        
        return  result;
    }
}