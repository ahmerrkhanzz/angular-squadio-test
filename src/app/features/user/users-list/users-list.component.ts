import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.mode';
import { PageEvent } from '@angular/material/paginator';
import { ApiResponse } from '../../../core/models/api-response.model';
import { MatDialog } from '@angular/material/dialog';
import { GenericPopupComponent } from '../../../shared/components/generic-popup/generic-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationPopupComponent } from '../../../shared/components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  sortField: string = 'id';
  sortDirection: string = 'asc';
  searchTerm: string = '';

  columns = [
    { key: 'id', header: 'ID' },
    { key: 'fname', header: 'First Name' },
    { key: 'lname', header: 'Last Name' },
    { key: 'username', header: 'Username' },
    { key: 'avatar', header: 'Avatar' },
  ];

  constructor(
    private userService: UserService,
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

    this.userService
      .getUsers(Object.keys(queryParams).length ? queryParams : undefined)
      .subscribe((response: ApiResponse) => {
        this.users = response.data ? response.data : response; // Assuming API returns "data"
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

  openUserPopup(user?: User): void {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      width: '600px',
      maxHeight: '90vh',
      data: {
        title: user ? 'Edit User' : 'Add User',
        ...(user || {
          fname: '',
          lname: '',
          username: '',
          password: '',
          email: '',
          avatar: '',
        }),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (user) {
          this.updateUser(user.id, result); // Call updateUser for editing
        } else {
          this.saveUser(result); // Call saveUser for adding
        }
      }
    });
  }

  // Save the user data by calling the API
  saveUser(userData: Partial<User>): void {
    this.userService.createUser(userData).subscribe(
      (response: ApiResponse<User>) => {
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

  updateUser(userId: number, userData: Partial<User>): void {
    this.userService.updateUser(userId, userData).subscribe(
      (response: ApiResponse<User>) => {
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

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.snackBar.open('User deleted successfully!', 'Close', {
          duration: 3000,
        }); // Show success message

        // Remove the user from the users array and refresh the table
        this.users = this.users.filter((u) => u.id !== userId); // Remove the user
      },
      (error) => {
        this.snackBar.open('Error deleting user. Please try again.', 'Close', {
          duration: 3000,
        }); // Show error message
      }
    );
  }

  onEdit(user: any): void {
    this.openUserPopup(user); // Open the popup for editing
  }

  onDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '500px',
      data: {
        message: `Are you sure you want to delete ${user.fname} ${user.lname}?`,
      }, // Custom confirmation message
    });

    // Handle the dialog closing
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteUser(user.id); // Call deleteUser if the user confirms
      }
    });
  }
}
