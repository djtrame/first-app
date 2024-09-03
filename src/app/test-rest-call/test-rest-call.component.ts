import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-test-rest-call',
  standalone: true,
  imports: [],
  template: `
    <p>test-rest-call works!</p>
    <!-- <img src="assets/steak_fajitas.jpg" alt="Description of the image" /> -->
    <div>
      @for (student of students; track student) {
      <div>{{ student.student_id }} - {{ student.name }}</div>
      }
    </div>
  `,
  styleUrl: './test-rest-call.component.css',
})
export class TestRestCallComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  students: Student[];

  constructor(private studentService: StudentService) {
    console.log('test-rest-call.component.ts is loaded');

    //if this page is called without a parameter this code doesn't log anything
    this.route.params.subscribe((params) => {
      console.log(params); // Access route parameters here
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }
}
