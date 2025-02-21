import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner-form',
  standalone: false,
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
})
export class PartnerFormComponent {
  partnerForm: FormGroup;
  defaultPartnerCode = '12345'; // ✅ Set default partner code

  constructor(private fb: FormBuilder) {
    this.partnerForm = this.fb.group({
      partnerCode: [{ value: this.defaultPartnerCode, disabled: true }], // ✅ Set default value and disable
      partnerName: [''],
      partnerEmail: ['', [Validators.email]],
      partnerContactPerson: [''],
      contactNumber: ['', [Validators.pattern('^[0-9]+$')]],
      partnerAddress: [''],
      activeStatus: ['Y']
    });
  }

  submitForm() {
    if (this.partnerForm.valid) {
      console.log('Form Submitted', this.partnerForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields before submitting.');
    }
  }

  resetForm() {
    this.partnerForm.reset({
      partnerCode: { value: this.defaultPartnerCode, disabled: true }, // ✅ Reset with default value
      partnerName: '',
      partnerEmail: '',
      partnerContactPerson: '',
      contactNumber: '',
      partnerAddress: '',
      activeStatus: 'Y'
    });
  }
}
