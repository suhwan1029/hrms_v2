import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmployeeService } from './service/employee.service'; 

declare var bootstrap: any; 

@Component({
  selector: 'app-employee-mst',
  standalone: false,
  templateUrl: './employee-mst.component.html',
  styleUrls: ['./employee-mst.component.css']
})
export class EmployeeMstComponent implements OnInit {
  employeeForm: FormGroup;
  showExperience = false;
  showEducation = false;
  showPromotion = false;
  showQualification = false;
  alertMessage: string = '';
  isOpen: { [key: string]: boolean } = {
    personalInfo: true,
    basicInfo: true,
    workInfo: true
  };
  
  imageUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      
      orgId: [''],
      employeeId: [''],
      employeeNo: [''],
      employeeName: [''],
      gender: [''],
      englishName: [''],
      emailId: [''],
      employeeType: [''],
      job: [''],
      title: [''],
      jobPosition: [''],
      promotionDate: [''],
      enteringDate: [''],
      lgEnteringDate: [''],
      recruitmentType: [''],
      birthDate: [''],
      dateOfRetirement: [''],
      leaveClassification: [''],
      hiringType: [''],
      resignDate: [''],
      lastWorkingDate: [''],
      designation: [''],
      grade: [''],
      bloodGroup: [''],
      mobileNumber: [''],
      department: [''],
      maritalStatus: [''],
      passportNo: [''],
      employeeImage: [''],
      confirmationDate: [''],
      contractType: [''],
      workLocation: [''],
      reportingManager: [''],
      employeeStatus: [''],
      career: [''],
      graduateSchool: [''],
      periodOfLeave: [''],
      nationality: [''],
      vacation: [''],
      virtualUser: [''],
      officialPhoneNumber: [''],
      mobileNo: [''],
      externalEmail: [''],
      homeAddress: [''],
      panNumber: [''],
      aadharNumber: [''],
      uanNumber: [''],
      resignationDate: [''],
      status: [''],
      
      
      // Dynamic Form Arrays for each section
      experienceDetails: this.fb.array([this.createExperience()]),
      educationDetails: this.fb.array([this.createEducation()]),
      promotionDetails: this.fb.array([this.createPromotion()]),
      qualificationDetails: this.fb.array([this.createQualification()]),
    });
  }

  ngOnInit(): void {}

  // Experience form group creation
  createExperience(): FormGroup {
    return this.fb.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  // Education form group creation
  createEducation(): FormGroup {
    return this.fb.group({
      instituteName: ['', Validators.required],
      admissionDate: ['', Validators.required],
      passoutDate: ['', Validators.required],
      courseName: ['', Validators.required],
      multipleSubCourse: [''],
      graduationCategory: [''],
      degreeName: ['', Validators.required],
    });
  }

  // Promotion form group creation
  createPromotion(): FormGroup {
    return this.fb.group({
      promotionCode: ['', Validators.required],
      promotionType: ['', Validators.required],
      positionLevel: [''],
      oldDesignation: ['', Validators.required],
      newDesignation: ['', Validators.required],
      effectiveFromDate: ['', Validators.required],
      effectiveToDate: ['', Validators.required],
    });
  }

  // Qualification form group creation
  createQualification(): FormGroup {
    return this.fb.group({
      qualificationName: ['', Validators.required],
      qualificationLevel: ['', Validators.required],
      publisher: ['', Validators.required],
      docNumber: ['', Validators.required],
      qualificationDate: ['', Validators.required],
      qualificationEvidenceCheck: ['', Validators.required],
    });
  }

  // Toggle section visibility
  toggleExperience() {
    this.showExperience = !this.showExperience;
  }

  toggleEducation() {
    this.showEducation = !this.showEducation;
  }

  togglePromotion() {
    this.showPromotion = !this.showPromotion;
  }

  toggleQualification() {
    this.showQualification = !this.showQualification;
  }

  // Add new entry to form arrays
  addExperience() {
    this.experienceDetails.push(this.createExperience());
  }

  addEducation() {
    this.educationDetails.push(this.createEducation());
  }

  addPromotion() {
    this.promotionDetails.push(this.createPromotion());
  }

  addQualification() {
    this.qualificationDetails.push(this.createQualification());
  }

  // Remove entry from form arrays
  removeExperience(i: number) {
    this.experienceDetails.removeAt(i);
  }

  removeEducation(i: number) {
    this.educationDetails.removeAt(i);
  }

  removePromotion(i: number) {
    this.promotionDetails.removeAt(i);
  }

  removeQualification(i: number) {
    this.qualificationDetails.removeAt(i);
  }

  onSubmit(): void {
    const filledData = Object.fromEntries(
      Object.entries(this.employeeForm.value).filter(([_, value]) => value !== '' && value !== null)
    );
  
    console.log('Submitting Data:', filledData);
  
    // Call `addEmployee` instead of `saveEmployee`
    this.employeeService.addEmployee(filledData).subscribe({
      next: (response) => {
        console.log('Employee saved successfully:', response);
        this.showAlert('Employee saved successfully!');
      },
      error: (err) => {
        console.error('Error saving employee:', err);
        this.showAlert('Failed to save employee!');
      }
    });
  }
  

  // Getter for dynamic form arrays
  get experienceDetails(): FormArray {
    return this.employeeForm.get('experienceDetails') as FormArray;
  }

  get educationDetails(): FormArray {
    return this.employeeForm.get('educationDetails') as FormArray;
  }

  get promotionDetails(): FormArray {
    return this.employeeForm.get('promotionDetails') as FormArray;
  }

  get qualificationDetails(): FormArray {
    return this.employeeForm.get('qualificationDetails') as FormArray;
  }

  resetForm() {
    this.employeeForm.reset({
      orgId: [''],
      employeeId: [''],
      employeeNo: [''],
      employeeName: [''],
      gender: [''],
      englishName: [''],
      emailId: [''],
      employeeType: [''],
      job: [''],
      title: [''],
      jobPosition: [''],
      promotionDate: [''],
      enteringDate: [''],
      lgEnteringDate: [''],
      recruitmentType: [''],
      birthDate: [''],
      dateOfRetirement: [''],
      leaveClassification: [''],
      hiringType: [''],
      resignDate: [''],
      lastWorkingDate: [''],
      designation: [''],
      grade: [''],
      bloodGroup: [''],
      mobileNumber: [''],
      department: [''],
      maritalStatus: [''],
      passportNo: [''],
      employeeImage: [''],
      confirmationDate: [''],
      contractType: [''],
      workLocation: [''],
      reportingManager: [''],
      employeeStatus: [''],
      career: [''],
      graduateSchool: [''],
      periodOfLeave: [''],
      nationality: [''],
      vacation: [''],
      virtualUser: [''],
      officialPhoneNumber: [''],
      mobileNo: [''],
      externalEmail: [''],
      homeAddress: [''],
      panNumber: [''],
      aadharNumber: [''],
      uanNumber: [''],
      resignationDate: [''],
      status: [''],
      
      // Dynamic Form Arrays for each section
      experienceDetails: this.fb.array([this.createExperience()]),
      educationDetails: this.fb.array([this.createEducation()]),
      promotionDetails: this.fb.array([this.createPromotion()]),
      qualificationDetails: this.fb.array([this.createQualification()]),
    });
  }
  
  
  triggerFileInput(): void {
    const fileInput = document.getElementById('employeeImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  previewFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        
       
        this.employeeForm.patchValue({
          employeeImage: this.imageUrl
        });
  
        this.employeeForm.get('employeeImage')?.updateValueAndValidity();
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  showAlert(message: string) {
    this.alertMessage = message;
    const alertModal = document.getElementById('alertModal');
  
    if (alertModal) {
      alertModal.removeAttribute('aria-hidden'); // ✅ Ensure the modal is accessible
      const modalInstance = new bootstrap.Modal(alertModal);
      modalInstance.show();
    }
  }
  
  
  toggleContent(section: string) {
    if (this.isOpen.hasOwnProperty(section)) {
      this.isOpen[section] = !this.isOpen[section];
    }
  }
}
