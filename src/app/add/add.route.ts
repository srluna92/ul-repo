import { Route } from '@angular/router';
import { AddComponent } from './add.component';

export const AddRoute: Route[] = [
  {
    path: 'addNewItem',
    component: AddComponent
  }
];
