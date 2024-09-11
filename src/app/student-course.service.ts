import { Injectable } from '@angular/core';
import { StudentCourse } from './student-course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentCourseService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/student-courses';

  getStudentCourses(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(this.url);
  }

  // updateStudents(data: Student): Observable<any> {
  //   return this.http.put(this.url + '/' + data.student_id, data);
  // }
}
