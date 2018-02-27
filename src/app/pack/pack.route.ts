import { Route } from '@angular/router';
import { PackComponent } from './pack.component';
import { GuardService } from '../service/guard.service';

export const PackRoute: Route[] = [
  {
    path: 'packs',
    canActivate: [GuardService],
    component: PackComponent
  }
];
