import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfrService } from '../rfr/service/rfr.service'; // Ensure this service is imported correctly

@Component({
  selector: 'app-rfr',
  templateUrl: './rfr.component.html',
  styleUrls: ['./rfr.component.css'],
  standalone: false
})
export class RfrComponent implements OnInit {
  rfrForm: FormGroup;

  showCtcAnalysis: boolean = false;
  showHRRecommendation: boolean = false;
  showStatus: boolean = false;
  showReopenDate: boolean = false;

  constructor(private fb: FormBuilder, private rfrService: RfrService) {
    this.rfrForm = this.fb.group({
     
      orgGroup: ['GDC0002'],
      rfrNo: ['', Validators.required],
      projectName: ['', Validators.required],
      location: ['', Validators.required],
      onsite: ['', Validators.required],
      billability: ['billable', Validators.required],
      resourceManagementGroup: ['Internal Movement', Validators.required],
      immediatelyBillable: ['Yes', Validators.required],
      functionType: ['development', Validators.required],
      vacancyType: ['permanent', Validators.required],
      positions: [1, [Validators.required, Validators.min(1)]],
      designation: ['', Validators.required],
      screeningBy: ['', Validators.required],
      education: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      industry: ['', Validators.required],
      cpTolerance: [''],
      managerRecommendation: [''],
      unitPrice: [''],
      reasonCpTolerance: [''],
      reasonManagerRecommendation: [''],
      reasonUnitPrice: [''],
      currentInternalAverage: [''],
      marketAverage: [''],
      quartileBasedAverage: [''],
      hrRecommendation: [''],
      hold: [''],
      statusDate: [''],
      closed: [''],
      additionalStatusDate: [''],
      reopenDateDept: [''],
      reopenDateHR: [''],
      reopenDatePresident: [''],
      signatureDept: [''],
      signatureHR: [''],
      signaturePresident: [''],
      essentialSkills: [''],
      desirableSkills: ['']
    });
  }

  ngOnInit(): void {}

  toggleCtcAnalysis() {
    this.showCtcAnalysis = !this.showCtcAnalysis;
  }

  toggleHRRecommendation() {
    this.showHRRecommendation = !this.showHRRecommendation;
  }

  toggleStatus() {
    this.showStatus = !this.showStatus;
  }

  toggleReopenDate() {
    this.showReopenDate = !this.showReopenDate;
  }

  onSubmit() {
    if (this.rfrForm.valid) {
      const formValues = this.rfrForm.getRawValue();

      // Transform form data into the required JSON structure
      const formattedData = {
        orgGroup: formValues.orgGroup,
        rfrNo: formValues.rfrNo,
        projectName: formValues.projectName,
        location: formValues.location,
        onsite: formValues.onsite,
        billability: formValues.billability,
        resourceManagementGroup: formValues.resourceManagementGroup,
        functionType: formValues.functionType,
        vacancyType: formValues.vacancyType,
        positions: formValues.positions,
        designation: formValues.designation,
        screeningBy: formValues.screeningBy,
        education: formValues.education,
        experience: formValues.experience,
        industry: formValues.industry,
        cpTolerance: formValues.cpTolerance,
        currentInternalAverage: formValues.currentInternalAverage,
        hold: formValues.hold,
        hrRecommendation: formValues.hrRecommendation,
        managerRecommendation: formValues.managerRecommendation,
        marketAverage: formValues.marketAverage,
        quartileBasedAverage: formValues.quartileBasedAverage,
        reasonCpTolerance: formValues.reasonCpTolerance,
        reasonManagerRecommendation: formValues.reasonManagerRecommendation,
        reasonUnitPrice: formValues.reasonUnitPrice,
        statusDate: formValues.statusDate,
        unitPrice: formValues.unitPrice,
        closed: formValues.closed,
        reopenDate: {
          reopenDateDept: formValues.reopenDateDept,
          reopenDateHR: formValues.reopenDateHR,
          reopenDatePresident: formValues.reopenDatePresident,
          signatureDept: formValues.signatureDept,
          signatureHR: formValues.signatureHR,
          signaturePresident: formValues.signaturePresident
        },
        skills: {
          essentialSkills: formValues.essentialSkills,
          desirableSkills: formValues.desirableSkills
        }
      };

      this.rfrService.createRfr(formattedData).subscribe(
        (response) => {
          console.log('RFR Created:', response);
          alert('RFR saved successfully!');
        },
        (error) => {
          console.error('Error saving RFR:', error);
          alert('Failed to save RFR.');
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please fill all required fields.');
    }
  }

  resetForm() {
    this.rfrForm.reset({
     
      orgGroup:'GDC0002',
      rfrNo: '',
      projectName: '',
      location: '',
      onsite: '',
      billability: 'billable',
      resourceManagementGroup: 'Internal Movement',
      immediatelyBillable: 'Yes',
      functionType: 'development',
      vacancyType: 'permanent',
      positions: 1,
      designation: '',
      screeningBy: '',
      education: '',
      experience: 2,
      industry: '',
      cpTolerance: '',
      managerRecommendation: '',
      unitPrice: '',
      reasonCpTolerance: '',
      reasonManagerRecommendation: '',
      reasonUnitPrice: '',
      currentInternalAverage: '',
      marketAverage: '',
      quartileBasedAverage: '',
      hrRecommendation: '',
      hold: '',
      statusDate: '',
      closed: '',
      additionalStatusDate: '',
      reopenDateDept: '',
      reopenDateHR: '',
      reopenDatePresident: '',
      signatureDept: '',
      signatureHR: '',
      signaturePresident: '',
      essentialSkills: '',
      desirableSkills: ''
    });
  }

  loadRfr(rfrNo: string) {
    this.rfrService.getRfrById(rfrNo).subscribe(
      (data) => {
        this.rfrForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching RFR:', error);
      }
    );
  }
}
