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

  constructor(private fb: FormBuilder, private router: Router) { 
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      passportNo: ['', Validators.required],
      designation: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      address: ['', Validators.required],
      
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;

      // ✅ Navigate to UlpComponent with query params
      this.router.navigate(['/dashboard/report/ulp'], { queryParams: formData });
    } else {
      alert('Please fill all required fields.');
    }
  }
}
