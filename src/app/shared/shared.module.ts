// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { GenericPopupComponent } from './components/generic-popup/generic-popup.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
// import { CommonTableComponent } from './components/common-table/common-table.component';

// Chart.js
// import { NgChartsModule } from 'ng2-charts';

// Components
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
// import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { TableFilterComponent } from './components/table-filter/table-filter.component';

@NgModule({
  declarations: [
    // ConfirmDialogComponent,
    // LoadingSpinnerComponent,
    // TableFilterComponent,

    CommonTableComponent,
    GenericPopupComponent,
    ConfirmationPopupComponent,
    ConfirmationPopupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatChipsModule,
    MatTooltipModule,
    // CommonTableComponent
    // NgChartsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatChipsModule,
    MatTooltipModule,
    CommonTableComponent,
    GenericPopupComponent,
    ConfirmationPopupComponent,
    // NgChartsModule,
    // ConfirmDialogComponent,
    // LoadingSpinnerComponent,
    // TableFilterComponent,
  ],
})
export class SharedModule {}
