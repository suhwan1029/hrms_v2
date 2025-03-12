import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-ulf',
  standalone:false,
  templateUrl: './ulf.component.html',
  styleUrls: ['./ulf.component.css']
})
export class UlfComponent {
  employeeForm: FormGroup;
  selectedFormat = 'pdf';  
  titleList: string[] = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.'];

  constructor(private fb: FormBuilder, private router: Router) { 
    this.employeeForm = this.fb.group({
      title: ['', Validators.required],  
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      passportNo: ['', Validators.required],
      designation: ['', Validators.required],
      md: ['', Validators.required],
      detail: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      console.log("Form Data Submitted:", formData);
  
      const queryString = new URLSearchParams(formData).toString();
      window.open(`/dashboard/report/ulp?${queryString}`, '_blank');
    } else {
      alert('Please fill all required fields.');
    }
  }
  

 
}
