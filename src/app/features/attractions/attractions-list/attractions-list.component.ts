import { Component, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiResponse } from '../../../core/models/api-response.model';
import { MatDialog } from '@angular/material/dialog';
import { GenericPopupComponent } from '../../../shared/components/generic-popup/generic-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationPopupComponent } from '../../../shared/components/confirmation-popup/confirmation-popup.component';
import { AttractionsService } from '../services/attractions.service';
import { Attractions } from '../models/attraction.model';

@Component({
  selector: 'app-attractions-list',
  standalone: false,
  templateUrl: './attractions-list.component.html',
  styleUrl: './attractions-list.component.scss',
})
export class AttractionsListComponent implements OnInit {
  attractions: Attractions[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  sortField: string = 'id';
  sortDirection: string = 'asc';
  searchTerm: string = '';

  columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'detail', header: 'Detail' },
    { key: 'latitude', header: 'Latitude' },
    { key: 'longitude', header: 'Longitude' },
  ];

  constructor(
    private attractionsService: AttractionsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchData(); // Fetch initial data
  }

  fetchData(
    params: { page?: number; per_page?: number; search?: string } = {}
  ): void {
    // Extract parameters, using defaults if not provided
    const {
      page = this.pageIndex,
      per_page = this.pageSize,
      search = '',
    } = params;

    // Construct query params object, but only include non-empty values
    const queryParams: any = {};
    if (params.page !== undefined) queryParams.page = page;
    if (params.per_page !== undefined) queryParams.limit = per_page;
    if (search) queryParams.search = search; // Only add if not empty

    this.attractionsService
      .getAttractions(Object.keys(queryParams).length ? queryParams : undefined)
      .subscribe((response: ApiResponse) => {
        this.attractions = response.data ? response.data : response; // Assuming API returns "data"
        this.pageIndex = page; // Update current page index
      });
  }

  // Handle pagination change
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.fetchData({ page: this.pageIndex, per_page: this.pageSize }); // Fetch data for the new page
  }

  // Handle search change
  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.fetchData({ search: this.searchTerm }); // Fetch data with new search term
  }

  openAttractionPopup(attraction?: Attractions): void {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      width: '600px',
      maxHeight: '90vh',
      data: {
        title: attraction ? 'Edit Attraction' : 'Add Attraction',
        ...(attraction || {
          name: '',
          detail: '',
          latitude: '',
          longitude: '',
          coverimage: '',
        }),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (attraction) {
          this.updateAttraction(attraction.id, result); // Call updateAttraction for editing
        } else {
          this.saveAttraction(result); // Call saveAttraction for adding
        }
      }
    });
  }

  // Save the user data by calling the API
  saveAttraction(userData: Partial<Attractions>): void {
    this.attractionsService.createAttraction(userData).subscribe(
      (response: ApiResponse<Attractions>) => {
        this.snackBar.open('User created successfully!', 'Close', {
          duration: 3000,
        }); // Show success message
        this.fetchData(); // Refresh the user list
      },
      (error) => {
        this.snackBar.open('Error creating user. Please try again.', 'Close', {
          duration: 3000,
        }); // Show error message
      }
    );
  }

  updateAttraction(userId: number, userData: Partial<Attractions>): void {
    this.attractionsService.updateAttraction(userId, userData).subscribe(
      (response: ApiResponse<Attractions>) => {
        if (!response.user) {
          this.snackBar.open(response.message, 'Close', {
            duration: 3000,
          });
          throw new Error('No data returned from the API');
        }
        this.snackBar.open('User updated successfully!', 'Close', {
          duration: 3000,
        }); // Show success message

        this.fetchData(); // Refresh the user list
      },
      (error) => {
        this.snackBar.open('Error updating user. Please try again.', 'Close', {
          duration: 3000,
        }); // Show error message
      }
    );
  }

  deleteAttraction(attractionId: number): void {
    this.attractionsService.deleteAttraction(attractionId).subscribe(
      () => {
        this.snackBar.open('Attraction deleted successfully!', 'Close', {
          duration: 3000,
        }); // Show success message

        // Remove the user from the users array and refresh the table
        this.attractions = this.attractions.filter(
          (u) => u.id !== attractionId
        ); // Remove the user
      },
      (error) => {
        this.snackBar.open(
          'Error deleting attraction. Please try again.',
          'Close',
          {
            duration: 3000,
          }
        ); // Show error message
      }
    );
  }

  onEdit(attraction: any): void {
    this.openAttractionPopup(attraction); // Open the popup for editing
  }

  onDelete(attraction: Attractions): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '500px',
      data: {
        message: `Are you sure you want to delete ${attraction.name}?`,
      }, // Custom confirmation message
    });

    // Handle the dialog closing
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteAttraction(attraction.id); // Call deleteUser if the user confirms
      }
    });
  }
}
