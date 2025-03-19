import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
  providers: [provideHttpClient()],
})
export class LayoutModule {}
