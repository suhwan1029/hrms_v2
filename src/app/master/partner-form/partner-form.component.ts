import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from './service/partner.service';
 
@Component({
  selector: 'app-partner-form',
  standalone: false,
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
})
export class PartnerFormComponent {
  partnerForm: FormGroup;
 
  constructor(private fb: FormBuilder, private partnerService: PartnerService) {
    this.partnerForm = this.fb.group({
      partnerCode: [{ value: '', disabled: true }], 
      partnerName: ['', Validators.required],
      partnerEmail: ['', [Validators.required, Validators.email]],
      partnerContactPerson: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      partnerAddress: ['', Validators.required],
      activeStatus: ['Y']
    });
  }
 
  submitForm() {
    this.partnerForm.markAllAsTouched();
 
    if (this.partnerForm.valid) {
      const formData = this.partnerForm.getRawValue();
 
      console.log('Submitting Form:', formData);
      this.partnerService.savePartner(formData).subscribe(
        (response) => {
          console.log('Partner saved successfully:', response);
          alert('Form submitted successfully!');
          this.resetForm();
        },
        (error) => {
          console.error('Error saving partner:', error);
          alert('Failed to submit the form. Try again.');
        }
      );
    } else {
      console.log('Form is invalid:', this.partnerForm.errors);
      alert('Please fill all required fields before submitting.');
    }
  }
 
  resetForm() {
    this.partnerForm.reset({
      partnerCode: { value: '', disabled: true }, 
      partnerName: '',
      partnerEmail: '',
      partnerContactPerson: '',
      contactNumber: '',
      partnerAddress: '',
      activeStatus: 'Y'
    });
  }
}