import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';
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
    <ag-grid-angular class="ag-theme-quartz-dark" style="height: 500px" />
  `,
  styleUrl: './student-courses-grid.component.css',
})
export class StudentCoursesGridComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  // [rowData]="students"
  // [columnDefs]="colDefs"
  // [defaultColDef]="defaultColDef"
  // [editType]="editType"
  // [pagination]="pagination"
  // [paginationPageSize]="paginationPageSize"
  // [paginationPageSizeSelector]="paginationPageSizeSelector"
  // (cellValueChanged)="onCellValueChanged($event)"
  // (rowValueChanged)="onRowValueChanged($event)"
  // (rowSelected)="onRowSelected($event)"
}
