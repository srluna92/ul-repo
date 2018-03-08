import { Route } from '@angular/router';
import { SearchRoute } from './search/search.route';
import { PackRoute } from './pack/pack.route';
import { AddRoute } from './add/add.route';
import { AboutRoutes } from './about/about.route';
import { SettingRoute } from './settings/settings.route';
import { LoginRoute } from './login/login.route';
import { DiscountRoute } from './discount/discount.route';
import { AdminRoute } from './admin/admin.route';

export const routes: Route[] = [
  ...AboutRoutes,
  ...SearchRoute,
  ...PackRoute,
  ...AddRoute,
  ...SettingRoute,
  ...LoginRoute,
  ...DiscountRoute,
  ...AdminRoute,
  {
    path: '**',
    redirectTo: 'about'
  }
];
