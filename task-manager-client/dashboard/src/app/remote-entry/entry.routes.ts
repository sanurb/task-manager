import { Route } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';

export const remoteRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('../modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', redirectTo: 'error/404' },
];
