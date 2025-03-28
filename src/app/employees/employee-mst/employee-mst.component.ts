import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmployeeService } from './service/employee.service'; 
import { ActivatedRoute } from '@angular/router';



declare var bootstrap: any; 

@Component({
  selector: 'app-employee-mst',
  standalone: false,
  templateUrl: './employee-mst.component.html',
  styleUrls: ['./employee-mst.component.css']
})
export class EmployeeMstComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  employeeForm: FormGroup;
  employee: any;
  showExperience = false;
  showEducation = false;
  showPromotion = false;
  showQualification = false;
  alertMessage: string = '';
  isOpen: { [key: string]: boolean } = {
    personalInfo: false,
    basicInfo: true,
    workInfo: false
  };
  isDisabled: boolean = true; // Set to true to disable fields

  
  imageUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService , private route: ActivatedRoute) {
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

  ngOnInit(): void {
    // Accessing the employee data from history.state
    this.employee = history.state?.employee;

    console.log('History State Employee:', this.employee);

    if (this.employee) {
      this.fillFormWithEmployeeData();
    } else {
      console.log('No employee data found in history.state');
    }
}

fillFormWithEmployeeData(): void {
  console.log('Employee Data:', this.employee);

  this.employeeForm.patchValue({
    orgId: this.employee.orgId,
    employeeId: this.employee.employeeId,
    employeeNo: this.employee.employeeNo,
    employeeName: this.employee.employeeName,
    gender: this.employee.gender,
    englishName: this.employee.englishName,
    emailId: this.employee.emailId,
    employeeType: this.employee.employeeType,
    job: this.employee.job,
    title: this.employee.title,
    jobPosition: this.employee.jobPosition,
    promotionDate: this.employee.promotionDate,
    enteringDate: this.employee.enteringDate,
    lgEnteringDate: this.employee.lgEnteringDate,
    recruitmentType: this.employee.recruitmentType,
    birthDate: this.employee.birthDate,
    dateOfRetirement: this.employee.dateOfRetirement,
    leaveClassification: this.employee.leaveClassification,
    hiringType: this.employee.hiringType,
    resignDate: this.employee.resignDate,
    lastWorkingDate: this.employee.lastWorkingDate,
    designation: this.employee.designation,
    grade: this.employee.grade,
    bloodGroup: this.employee.bloodGroup,
    mobileNumber: this.employee.mobileNumber,
    department: this.employee.department,
    maritalStatus: this.employee.maritalStatus,
    passportNo: this.employee.passportNo,
    employeeImage: this.employee.employeeImage,
    confirmationDate: this.employee.confirmationDate,
    contractType: this.employee.contractType,
    workLocation: this.employee.workLocation,
    reportingManager: this.employee.reportingManager,
    employeeStatus: this.employee.employeeStatus,
    career: this.employee.career,
    graduateSchool: this.employee.graduateSchool,
    periodOfLeave: this.employee.periodOfLeave,
    nationality: this.employee.nationality,
    vacation: this.employee.vacation,
    virtualUser: this.employee.virtualUser,
    officialPhoneNumber: this.employee.officialPhoneNumber,
    mobileNo: this.employee.mobileNo,
    externalEmail: this.employee.externalEmail,
    homeAddress: this.employee.homeAddress,
    panNumber: this.employee.panNumber,
    aadharNumber: this.employee.aadharNumber,
    uanNumber: this.employee.uanNumber,
    resignationDate: this.employee.resignationDate,
    status: this.employee.status,
  });

  // Handle FormArrays properly
  this.setFormArrayData('experienceDetails', this.employee.experience || []);
  this.setFormArrayData('educationDetails', this.employee.education || []);
  this.setFormArrayData('promotionDetails', this.employee.promotion || []);
  this.setFormArrayData('qualificationDetails', this.employee.qualification || []);
}

setFormArrayData(controlName: string, data: any[]): void {
  const control = this.employeeForm.get(controlName) as FormArray;
  control.clear(); // Clear existing data

  data.forEach(item => {
    control.push(this.fb.group(item)); // Add new form groups
  });
}
  // Example methods to create form groups for nested arrays
  createExperience(experience?: any): FormGroup {
    return this.fb.group({
      companyName: [experience?.companyName || ''],
      jobTitle: [experience?.jobTitle || ''],
      department: [experience?.department || ''],
      startDate: [experience?.startDate || ''],
      endDate: [experience?.endDate || '']
    });
  }
  
  createEducation(education?: any): FormGroup {
    return this.fb.group({
      instituteName: [education?.instituteName || ''],
      admissionDate: [education?.admissionDate || ''],
      passoutDate: [education?.passoutDate || ''],
      courseName: [education?.courseName || ''],
      multipleSubCourse: [education?.multipleSubCourse || ''],
      graduationCategory: [education?.graduationCategory || ''],
      degreeName: [education?.degreeName || '']
    });
  }
  
  createPromotion(promotion?: any): FormGroup {
    return this.fb.group({
      promotionCode: [promotion?.promotionCode || ''],
      promotionType: [promotion?.promotionType || ''],
      positionLevel: [promotion?.positionLevel || ''],
      oldDesignation: [promotion?.oldDesignation || ''],
      newDesignation: [promotion?.newDesignation || ''],
      effectiveFromDate: [promotion?.effectiveFromDate || ''],
      effectiveToDate: [promotion?.effectiveToDate || '']
    });
  }
  
  createQualification(qualification?: any): FormGroup {
    return this.fb.group({
      qualificationName: [qualification?.qualificationName || ''],
      qualificationLevel: [qualification?.qualificationLevel || ''],
      publisher: [qualification?.publisher || ''],
      docNumber: [qualification?.docNumber || ''],
      qualificationDate: [qualification?.qualificationDate || ''],
      qualificationEvidenceCheck: [qualification?.qualificationEvidenceCheck || '']
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
    if (this.fileInput) {
      this.fileInput.nativeElement.click();  // ✅ Correct reference
    }
  }

  previewFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
  
      // Create a FileReader to generate a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;  // Set the preview URL
        this.employeeForm.patchValue({ employeeImage: file.name }); // Store the file name
      };
      reader.readAsDataURL(file);  // Convert file to Base64
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


  toggleFields(): void {
    this.isDisabled = !this.isDisabled;
  }

   
  
  
}
