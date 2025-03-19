import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsListComponent } from './attractions-list/attractions-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AttractionsListComponent],
  imports: [CommonModule, AttractionsRoutingModule, SharedModule],
})
export class AttractionsModule {}
