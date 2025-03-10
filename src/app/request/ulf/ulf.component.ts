import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ulf',
  standalone:false,
  templateUrl: './ulf.component.html',
  styleUrls: ['./ulf.component.css']
})
export class UlfComponent {
  employeeForm: FormGroup;
  public titleList: string[] = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.'];

  constructor(private fb: FormBuilder, private router: Router) { 
    this.employeeForm = this.fb.group({
      title: ['', Validators.required],  // ✅ Added required validator for title
      name: ['', Validators.required],
      passportNo: ['', Validators.required],
      designation: ['', Validators.required],
      md: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      console.log("Form Data Submitted:", formData); // ✅ Debugging

      // ✅ Navigate to UlpComponent with query params
      this.router.navigate(['/dashboard/report/ulp'], { queryParams: formData });
    } else {
      alert('Please fill all required fields.');
    }
  }
}
