import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

@Component({
  selector: 'app-material-test',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AgGridAngular,
  ],
  template: `
    <p>material-test works!</p>
    <mat-slide-toggle>Toggle me!</mat-slide-toggle>
    <hr />
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Favorite food</mat-label>
        <input matInput placeholder="Ex. Pizza" value="Sushi" />
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Leave a comment</mat-label>
        <textarea matInput placeholder="Ex. It makes me feel..."></textarea>
      </mat-form-field>
    </form>
    <hr />
    <form (ngSubmit)="addRow()">
      <input
        [(ngModel)]="newRow.carMake"
        name="make"
        placeholder="Make"
        required
      />
      <input
        [(ngModel)]="newRow.model"
        name="model"
        placeholder="Model"
        required
      />
      <input
        [(ngModel)]="newRow.price"
        name="price"
        placeholder="Price"
        required
      />
      <input
        [(ngModel)]="newRow.electric"
        name="electric"
        placeholder="Electric"
        required
      />
      <button type="submit">Add Row</button>
    </form>
    <ag-grid-angular
      class="ag-theme-quartz-dark"
      style="height: 500px"
      [rowData]="rowData"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDef"
      [pagination]="pagination"
      [paginationPageSize]="paginationPageSize"
      [paginationPageSizeSelector]="paginationPageSizeSelector"
    />
  `,
  styleUrl: './material-test.component.css',
})
export class MaterialTestComponent {
  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true, //displays them on a line below the header for quick access
    editable: true,
  };

  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20];
  newRow = { carMake: '', model: '', price: null, electric: null };

  // Row Data: The data to be displayed.
  rowData = [
    { carMake: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { carMake: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { carMake: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      field: 'carMake', //camel case works to interpret its own column heading
      //flex: 2, //this can help determine how much space a column should occupy
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Tesla', 'Ford', 'Toyota'] },
      checkboxSelection: true,
    },
    { field: 'model' },
    {
      field: 'price',
      headerName: 'MSRP', //you can also give it your own explicit header name
      valueFormatter: (p) => '$' + p.value.toLocaleString(),
    },
    { field: 'electric' },
  ];

  addRow() {
    console.log('addRow button clicked!');
  }
}
