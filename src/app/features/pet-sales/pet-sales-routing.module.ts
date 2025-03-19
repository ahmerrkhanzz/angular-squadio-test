import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetSalesDetailsComponent } from './pet-sales-details/pet-sales-details.component';

const routes: Routes = [
  {
    path: '',
    component: PetSalesDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetSalesRoutingModule {}
