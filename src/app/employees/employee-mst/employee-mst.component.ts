import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-mst',
  standalone : false,
  templateUrl: './employee-mst.component.html',
  styleUrls: ['./employee-mst.component.css']
})
export class EmployeeMstComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form group here
    this.employeeForm = this.fb.group({
      orgId: ['', Validators.required],
      employeeId: ['', Validators.required],
      employeeNo: ['', Validators.required],
      employeeName: ['', Validators.required],
      gender: ['', Validators.required],
      englishName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      employeeType: ['', Validators.required],
      job: ['', Validators.required],
      title: ['', Validators.required],
      jobPosition: ['', Validators.required],
      promotionDate: ['', Validators.required],
      enteringDate: ['', Validators.required],
      lgEnteringDate: ['', Validators.required],
      recruitmentType: ['', Validators.required],
      birthDate: ['', Validators.required],
      dateOfRetirement: ['', Validators.required],
      leaveClassification: ['', Validators.required],
      hiringType: ['', Validators.required],
      resignDate: ['', Validators.required],
      lastWorkingDate: ['', Validators.required],
      designation: ['', Validators.required],
      grade: ['', Validators.required],
      department: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      uanNo: ['', Validators.required],
      aadharNo: ['', Validators.required],
      panNo: ['', Validators.required],
      passportNo: ['', Validators.required],
      employeeImage: ['', Validators.required],
      employeeStatus: ['', Validators.required],
      career: ['', Validators.required],
      graduateSchool: ['', Validators.required],
      periodOfLeave: ['', Validators.required],
      nationality: ['', Validators.required],
      vacation: ['', Validators.required],
      virtualUser: ['', Validators.required],
      officialPhoneNumber: ['', Validators.required],
      mobileNo: ['', Validators.required],
      externalEmail: ['', Validators.required],
      homeAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // ngOnInit remains empty, as the form is already initialized in the constructor
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Form Data: ', this.employeeForm.value);
      // You can send the data to a backend API
    }
  }
}
