import { StudentDto, StudentFormData } from "../models/Student";
import { restApiUrl } from "../shared/urls";

class StudentAuthService {
  private student_id: string | null = null;
  constructor() {
    const studentId = localStorage.getItem("student_id");
    if (studentId != null) {
      this.setStudentId(studentId);
    }
  }
  async login(studentData: StudentFormData): Promise<{ id: string }> {
    const { student_id } = await this.loginRequest(studentData);
    await localStorage.setItem("student_id", student_id);
    this.setStudentId(student_id);
    return { id: student_id };
  }

  isAuthentificated(): boolean {
    return !!this.student_id;
  }

  logout() {
    this.setStudentId(null);
    localStorage.clear();
  }

  private async getStudent(id: string): Promise<StudentDto> {
    const response = await fetch(`${restApiUrl}/students/${id}`);
    return (await response.json()) as StudentDto;
  }

  private async loginRequest(
    studentData: StudentFormData
  ): Promise<{ student_id: string }> {
    const response = await fetch(`${restApiUrl}/student/login`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(studentData) || null,
    });
    return (await response.json()) as { student_id: string };
  }

  private setStudentId(id: string | null) {
    this.student_id = id;
  }

  getStudentID(): string {
    return this.student_id!;
  }
}

export default StudentAuthService;
