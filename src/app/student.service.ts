import { Injectable } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/students';

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  updateStudent(data: Student): Observable<any> {
    return this.http.put(this.url + '/' + data.student_id, data);
  }

  createStudent(data: Student): Observable<any> {
    return this.http.post(this.url, data);
  }
}
