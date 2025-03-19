import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-popup',
  standalone: false,
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.css']
})
export class GenericPopupComponent implements OnInit {
  form: FormGroup;
  fields: { key: string, label: string, type: string }[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GenericPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    // Dynamically create form fields based on the input object
    for (const key of Object.keys(this.data)) {
      if (key !== 'title' && key !== 'id') { // Skip the 'title' key
        this.fields.push({
          key: key,
          label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
          type: this.getFieldType(key) // Determine the field type (text, email, password, etc.)
        });

        // Add form control with validators
        this.form.addControl(key, this.fb.control(this.data[key], this.getValidators(key)));
      }
    }
  }

  // Determine the field type based on the key
  getFieldType(key: string): string {
    if (key === 'email') return 'email';
    if (key === 'password') return 'password';
    if (key === 'latitude' || key === 'longitude') return 'number';
    return 'text';
  }

  // Add validators based on the field type
  getValidators(key: string): any[] {
    const validators = [];
    if (key === 'email') validators.push(Validators.email);
    if (key === 'password') validators.push(Validators.minLength(6));
    if (key === 'name' || key === 'detail') validators.push(Validators.required);
    return validators;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // Return the form value to the parent
    }
  }

  // Close the popup
  onCancel(): void {
    this.dialogRef.close();
  }
}