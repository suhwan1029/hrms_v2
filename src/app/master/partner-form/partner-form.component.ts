import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from './service/partner.service';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
})
export class PartnerFormComponent {
  partnerForm: FormGroup;

  constructor(private fb: FormBuilder, private partnerService: PartnerService) {
    this.partnerForm = this.fb.group({
      partnerCode: [''], // No default value
      partnerName: ['', Validators.required],
      partnerEmail: ['', [Validators.required, Validators.email]],
      partnerContactPerson: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      partnerAddress: ['', Validators.required],
      activeStatus: ['Y']
    });
  }

  submitForm() {
    if (this.partnerForm.valid) {
      console.log('Submitting Form:', this.partnerForm.value);
      this.partnerService.savePartner(this.partnerForm.value).subscribe(
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
      alert('Please fill all required fields before submitting.');
    }
  }

  resetForm() {
    this.partnerForm.reset({
      partnerCode: '', // Reset as empty
      partnerName: '',
      partnerEmail: '',
      partnerContactPerson: '',
      contactNumber: '',
      partnerAddress: '',
      activeStatus: 'Y'
    });
  }
}
