import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { RfrService } from '../rfr/service/rfr.service';
import { ApprovalFormComponent } from '../approval-form/approval-form.component';

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
  isDisabled: boolean = true; 

  constructor(
    private fb: FormBuilder, 
    private rfrService: RfrService,
    private dialog: MatDialog,
    private route: ActivatedRoute // Inject ActivatedRoute to get route params
  ) {
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
      hold: [false],  // Changed to boolean
      statusDate: [''],
      closed: [false],  // Changed to boolean
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

  ngOnInit(): void {
    // Get RFR number from route params and load data
    this.route.paramMap.subscribe(params => {
      const rfrNo = params.get('rfrNo'); 
      console.log(rfrNo);
      if (rfrNo) {
        this.loadRfr(rfrNo);
      }
    });
  }

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
        hold: formValues.hold ? 'H' : '',  // Convert boolean to 'H'
        hrRecommendation: formValues.hrRecommendation,
        managerRecommendation: formValues.managerRecommendation,
        marketAverage: formValues.marketAverage,
        quartileBasedAverage: formValues.quartileBasedAverage,
        reasonCpTolerance: formValues.reasonCpTolerance,
        reasonManagerRecommendation: formValues.reasonManagerRecommendation,
        reasonUnitPrice: formValues.reasonUnitPrice,
        statusDate: formValues.statusDate,
        unitPrice: formValues.unitPrice,
        closed: formValues.closed ? 'C' : '',  // Convert boolean to 'C'
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
          this.isDisabled = false; 
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
      orgGroup: 'GDC0002',
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
      hold: false,  // Reset to false
      statusDate: '',
      closed: false,  // Reset to false
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
    this.isDisabled = true;
  }

  loadRfr(rfrNo: string) {
    this.rfrService.getRfrById(rfrNo).subscribe(
      (data) => {
        this.rfrForm.patchValue({
          ...data,
          hold: data.hold === 'H',  // Convert 'H' to boolean
          closed: data.closed === 'C'  // Convert 'C' to boolean
        });
      },
      (error) => {
        console.error('Error fetching RFR:', error);
        alert('Error fetching RFR:');
      }
    );
  }

  /**
   * Opens the approval dialog when clicking "Approval"
   */
  onApprovalClick() {
    if (!this.isDisabled) {
      const dialogRef = this.dialog.open(ApprovalFormComponent, {
        width: '500px',
        data: this.rfrForm.value
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Approval confirmed:', result);
          alert('Approval processed successfully!');
        }
      });
    } else {
      alert('Please save the RFR before approval.');
    }
  }
}
