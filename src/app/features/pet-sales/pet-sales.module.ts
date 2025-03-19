import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetSalesRoutingModule } from './pet-sales-routing.module';
import { PetSalesDetailsComponent } from './pet-sales-details/pet-sales-details.component';
import { PetSalesChartComponent } from './pet-sales-chart/pet-sales-chart.component';


@NgModule({
  declarations: [
    PetSalesDetailsComponent,
    PetSalesChartComponent
  ],
  imports: [
    CommonModule,
    PetSalesRoutingModule
  ]
})
export class PetSalesModule { }
