import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rfr-form',
  standalone: false,
  templateUrl: './rfr.component.html',
  styleUrls: ['./rfr.component.css']
})
export class RfrComponent {
  rfrForm: FormGroup;
  showCtcAnalysis: boolean = false;
  showHRReccomendation: boolean = false;
  showStatus: boolean = false;
  showReopenDate: boolean = false;

  constructor(private fb: FormBuilder) {
    this.rfrForm = this.fb.group({
      // First Row
      orgGroup: [''],
      rfrNo: ['', Validators.required],
      projectName: ['', Validators.required],

      // Second Row
      location: ['', Validators.required],
      onsite: ['', Validators.required],
      billability: ['billable', Validators.required],
      resourceManagementGroup: ['Internal Movement', Validators.required],

      // Third Row
      functionType: ['development', Validators.required],
      vacancyType: ['permanent', Validators.required],
      positions: [1, [Validators.required, Validators.min(1)]],

      // Fourth Row
      designation: ['', Validators.required],
      screeningBy: ['', Validators.required],
      education: ['', Validators.required],

      // Fifth Row
      experience: ['', [Validators.required, Validators.min(0)]],
      industry: ['', Validators.required],

      // Checkbox for Hold and Closed
      hold: [false],
      closed: [false],
      statusDate: [''],

      // CTC Analysis Section
      cpTolerance: [''],
      managerRecommendation: [''],
      unitPrice: [''],
      reasonCpTolerance: [''],
      reasonManagerRecommendation: [''],
      reasonUnitPrice: [''],

      // HR Recommendation Section
      currentInternalAverage: [''],
      marketAverage: [''],
      quartileBasedAverage: [''],
      hrRecommendation: [''],

      // Reopen Date Section
      reopenDateDept: [''],
      reopenDateHR: [''],
      reopenDatePresident: [''],
      signatureDept: [''],
      signatureHR: [''],
      signaturePresident: [''],

      // Skills Section
      essentialSkills: [
        'Data classification, Data Cleansing, Data Sourcing, Data Enrichment'
      ],
      desirableSkills: ['NA']
    });
  }

  toggleCtcAnalysis() {
    this.showCtcAnalysis = !this.showCtcAnalysis;
  }

  toggleHRReccomendation() {
    this.showHRReccomendation = !this.showHRReccomendation;
  }

  toggleStatus() {
    this.showStatus = !this.showStatus;
  }

  toggleReopenDate() {
    this.showReopenDate = !this.showReopenDate;
  }

  onSubmit() {
    if (this.rfrForm.valid) {
      console.log('Form Data:', this.rfrForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields before submitting.');
    }
  }

  onCancel(): void {
    this.rfrForm.reset();
  }
}
