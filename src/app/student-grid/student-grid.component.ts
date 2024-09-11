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
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
//import { CellValueChangedEvent } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-grid',
  standalone: true,
  imports: [AgGridAngular, FormsModule],
  template: `
    <p>student-grid works!</p>
    <hr />
    <div>
      <form (ngSubmit)="addRow()">
        <input
          [(ngModel)]="newRow.name"
          name="name"
          placeholder="Name"
          required
        />
        <button type="submit">Add Row</button>
      </form>
    </div>
    <hr />

    <!-- <button click="addRow()">Add Row</button> -->

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
      (rowSelected)="onRowSelected($event)"
      (gridReady)="onGridReady($event)"
      [pinnedTopRowData]="pinnedTopRowData"
    />
  `,
  styleUrl: './student-grid.component.css',
})
export class StudentGridComponent implements OnInit {
  private gridApi!: GridApi;

  route: ActivatedRoute = inject(ActivatedRoute);
  students: Student[];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20];
  editType: 'fullRow' = 'fullRow';
  newRow = { student_id: '', name: '' };
  inputRow: {} = {};
  pinnedTopRowData = [this.inputRow];

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true, //displays them on a line below the header for quick access
    editable: true,
    cellDataType: false,
    valueFormatter: (params: ValueFormatterParams): any =>
      this.isEmptyPinnedCell(params)
        ? this.createPinnedCellPlaceholder(params)
        : undefined,
  };

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      field: 'student_id',
      checkboxSelection: true,
      editable: false,
      hide: true,
    },
    { field: 'name', checkboxSelection: true },
  ];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getStudents();
  }

  getStudents(): void {
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

    //if at this point the student ID is undefined then it likely means we've arrived here after editing the special pinned row at the top
    if (data.student_id === undefined) {
      this.addPinnedRow(data.name);
    } else {
      this.studentService.updateStudent(data).subscribe((response) => {
        console.log('Data updated:', response);
      });
    }

    //reset the pinned row
    this.inputRow = {};
    this.pinnedTopRowData = [this.inputRow];
  }

  onRowSelected(event: RowSelectedEvent) {
    let rowNode = event.node;

    if (rowNode.isSelected()) {
      console.log(
        'onRowSelected: (' +
          rowNode.data.student_id +
          ', ' +
          rowNode.data.name +
          ')'
      );
    }
  }

  addRow() {
    //let newStudent : Student = {};
    const newStudent: Student = {
      student_id: 0,
      name: this.newRow.name,
    };

    let newNameJson = JSON.stringify(newStudent);
    console.log('addRow button clicked!: ' + newNameJson);
    //console.log('addRow button clicked!: ' + newStudent.name);

    this.studentService.createStudent(newStudent).subscribe((response) => {
      console.log('Student Created: ', response);
    });

    this.getStudents(); //this seems to have worked?  sometimes?  lol

    //this.gridApi.setGridOption("loading", true);
    //this.gridApi.redrawRows();
    //this.gridApi.refreshCells({ force: true }); //student-grid.component.ts:27 ERROR TypeError: Cannot read properties of undefined (reading 'refreshCells')
    //this.gridApi.refreshClientSideRowModel();
  }

  addPinnedRow(studentName: string) {
    const newStudent: Student = {
      student_id: 0,
      name: studentName,
    };

    let newNameJson = JSON.stringify(newStudent);

    this.studentService.createStudent(newStudent).subscribe((response) => {
      console.log('Student Created: ', response);
    });

    this.getStudents();

    console.log('Trying to refresh cells...');
    this.gridApi?.refreshCells({ force: true }); //buggy - i don't trust this 100% yet
    //this.gridApi?.redrawRows();
  }

  onGridReady(params: GridReadyEvent) {
    console.log('grid ready');
    this.gridApi = params.api; //very important to give this a value..
  }

  private isEmptyPinnedCell({ node, value }: ValueFormatterParams): boolean {
    return (
      (node!.rowPinned === 'top' && value == null) ||
      (node!.rowPinned === 'top' && value === '')
    );
  }

  private createPinnedCellPlaceholder({
    colDef,
  }: ValueFormatterParams): string {
    return colDef.field![0].toUpperCase() + colDef.field!.slice(1) + '...';
  }
}
