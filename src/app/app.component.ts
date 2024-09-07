import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule],
  template: `
    <main>
      home page app.component.ts
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="/assets/logo.svg"
            alt="logo"
            aria-hidden="true"
          />
        </header>
      </a>
      &nbsp;
      <a [routerLink]="['test-rest-call', 5]"> test-rest-call </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
      &nbsp;
      <a [routerLink]="['material-test']"> material-test </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
      &nbsp;
      <a [routerLink]="['student-grid']"> student-grid </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
