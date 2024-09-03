import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { TestRestCallComponent } from './test-rest-call/test-rest-call.component';
import { MaterialTestComponent } from './material-test/material-test.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
  {
    path: 'test-rest-call',
    component: TestRestCallComponent,
    title: 'Test Rest Call',
  },
  {
    path: 'test-rest-call/:param1',
    component: TestRestCallComponent,
    title: 'Test Rest Call',
  },
  {
    path: 'material-test',
    component: MaterialTestComponent,
    title: 'Material Test',
  },
];

export default routeConfig;
