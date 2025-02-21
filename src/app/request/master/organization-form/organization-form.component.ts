import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from './service/organization.service';


@Component({
  selector: 'app-organization-form',
  standalone: false,
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css']
})
export class OrganizationFormComponent {
  organizationForm: FormGroup;

  constructor(private fb: FormBuilder, private orgService: OrganizationService) {
    this.organizationForm = this.fb.group({
      organizationId: [{ value: '', disabled: true }],  // Read-Only
      organizationCode: ['', Validators.required],
      organizationName: ['', Validators.required],
      orgAddress: [''],
      effectiveFromDate: ['', Validators.required],
      effectiveEndDate: [''],
      operatingUnit: [''],
      legalEntity: [''],
      enabledFlag: ['Y']
    });
  }

  onSubmit() {
    if (this.organizationForm.valid) {
      const formData = this.organizationForm.getRawValue(); // Get all values including disabled ones

      this.orgService.createOrganization(formData).subscribe(
        (response) => {
          console.log('Organization Created:', response);
          alert('Organization saved successfully!');
        },
        (error) => {
          console.error('Error saving organization:', error);
          alert('Failed to save organization.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.organizationForm.reset({
      organizationId: '',
      organizationCode: '',
      organizationName: '',
      orgAddress: '',
      effectiveFromDate: '',
      effectiveEndDate: '',
      operatingUnit: '',
      legalEntity: '',
      enabledFlag: 'Y'
    });
  }

  loadOrganization(id: string) {
    this.orgService.getOrganizationById(id).subscribe(
      (data) => {
        this.organizationForm.patchValue(data);  // Populate form with data
      },
      (error) => {
        console.error('Error fetching organization:', error);
      }
    );
  }
}
