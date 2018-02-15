import { Route } from '@angular/router';
import { SearchRoute } from './search/search.route';
import { PackRoute } from './pack/pack.route';
import { AddRoute } from './add/add.route';
import { AboutRoutes } from './about/about.route';
import { SettingRoute } from './settings/settings.route';

export const routes: Route[] = [
  ...AboutRoutes,
  ...SearchRoute,
  ...PackRoute,
  ...AddRoute,
  ...SettingRoute,
  {
    path: '**',
    redirectTo: 'about'
  }
];
