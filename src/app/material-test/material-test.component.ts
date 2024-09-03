import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material-test',
  standalone: true,
  imports: [],
  template: ` <p>material-test works!</p> `,
  styleUrl: './material-test.component.css',
})
export class MaterialTestComponent {}
