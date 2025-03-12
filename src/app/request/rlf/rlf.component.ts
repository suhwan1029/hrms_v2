import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rlf',
  templateUrl: './rlf.component.html',
  standalone: false,
  styleUrls: ['./rlf.component.css']
})
export class RlfComponent {
  rlfForm: FormGroup;
  titleList: string[] = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.'];

  constructor(private fb: FormBuilder) {
    this.rlfForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      endDate: ['', Validators.required],
      designation: ['', Validators.required],
      passportNo: ['', Validators.required],
      teamLeader: ['', Validators.required],
      currentDate: [new Date().toISOString().slice(0, 10), Validators.required],
      companyName: ['', Validators.required],
      visaNo: ['', Validators.required],
      address: ['', Validators.required],
      toaddress: ['', Validators.required],
      empaddress: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rlfForm.valid) {
      const formData = this.rlfForm.value;
      console.log("Form Data Submitted:", formData);
  
      const queryString = new URLSearchParams(formData).toString();
      window.open(`/dashboard/report/rlp?${queryString}`, '_blank');
    } else {
      alert('Please fill all required fields.');
    }
  }

  resetForm(): void {
    this.rlfForm.reset();
    this.rlfForm.patchValue({
      currentDate: new Date().toISOString().slice(0, 10)
    });
  }
}
