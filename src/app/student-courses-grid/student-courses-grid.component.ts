import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { StudentCourse } from '../student-course';
import { StudentCourseService } from '../student-course.service';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellValueChangedEvent,
  RowValueChangedEvent,
  ColDef,
  RowSelectedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

@Component({
  selector: 'app-student-courses-grid',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <p>student-courses-grid works!</p>
    <ag-grid-angular
      class="ag-theme-quartz-dark"
      style="height: 500px"
      [rowData]="studentCourses"
      [defaultColDef]="defaultColDef"
      [columnDefs]="colDefs"
    />
  `,
  styleUrl: './student-courses-grid.component.css',
})
export class StudentCoursesGridComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  studentCourses: StudentCourse[];

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true, //displays them on a line below the header for quick access
    editable: true,
    cellDataType: false,
  };

  colDefs: ColDef[] = [
    {
      field: 'student.student_id',
    },
    { field: 'student.name' },
    { field: 'course.course_id' },
    { field: 'course.name' },
    { field: 'enrollmentDate' },
  ];

  constructor(private studentCourseService: StudentCourseService) {}
  //todo add coldefs

  // [editType]="editType"
  // [pagination]="pagination"
  // [paginationPageSize]="paginationPageSize"
  // [paginationPageSizeSelector]="paginationPageSizeSelector"
  // (cellValueChanged)="onCellValueChanged($event)"
  // (rowValueChanged)="onRowValueChanged($event)"
  // (rowSelected)="onRowSelected($event)"

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.studentCourseService.getStudentCourses().subscribe((data) => {
      this.studentCourses = data;
    });
  }
}
