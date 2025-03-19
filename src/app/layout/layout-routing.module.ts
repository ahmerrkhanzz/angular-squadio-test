import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../features/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'attractions',
        loadChildren: () =>
          import('../features/attractions/attractions.module').then(
            (m) => m.AttractionsModule
          ),
      },
      {
        path: 'pet-sales',
        loadChildren: () =>
          import('../features/pet-sales/pet-sales.module').then(
            (m) => m.PetSalesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
