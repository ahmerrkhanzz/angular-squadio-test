import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  standalone: false,
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css'],
})
export class ConfirmationPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string } // Inject data (e.g., confirmation message)
  ) {}

  // Handle confirmation
  onConfirm(): void {
    this.dialogRef.close(true); // Return true if the user confirms
  }

  // Handle cancellation
  onCancel(): void {
    this.dialogRef.close(false); // Return false if the user cancels
  }
}
