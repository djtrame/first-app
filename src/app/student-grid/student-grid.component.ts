import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellValueChangedEvent,
  RowValueChangedEvent,
  ColDef,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
//import { CellValueChangedEvent } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

@Component({
  selector: 'app-student-grid',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <p>student-grid works!</p>
    <ag-grid-angular
      class="ag-theme-quartz-dark"
      style="height: 500px"
      [rowData]="students"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDef"
      [editType]="editType"
      [pagination]="pagination"
      [paginationPageSize]="paginationPageSize"
      [paginationPageSizeSelector]="paginationPageSizeSelector"
      (cellValueChanged)="onCellValueChanged($event)"
      (rowValueChanged)="onRowValueChanged($event)"
    />
  `,
  styleUrl: './student-grid.component.css',
})
export class StudentGridComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  students: Student[];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20];
  editType: 'fullRow' = 'fullRow';
  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true, //displays them on a line below the header for quick access
    editable: true,
    cellDataType: false,
  };

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      field: 'student_id',
      checkboxSelection: true,
      editable: false,
    },
    { field: 'name' },
  ];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data;
    console.log(
      'onRowValueChanged: (' + data.student_id + ', ' + data.name + ')'
    );

    this.studentService.updateStudents(data).subscribe((response) => {
      console.log('Data updated:', response);
    });
  }
}
