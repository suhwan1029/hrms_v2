import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { formatDate } from '@angular/common';

import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

@Component({
  selector: 'app-ulf',
  standalone: false,
  templateUrl: './ulf.component.html',
  styleUrls: ['./ulf.component.css']
})
export class UlfComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  isDropdownOpen = false;
  isSubmitted = false; // Initially false
   currentDate: string = formatDate(new Date(), 'MMMM dd, yyyy', 'en-US');

  employeeForm: FormGroup;
  titleList: string[] = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.'];
  employeeData: any = {}; // Store submitted data

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
      this.employeeData = this.employeeForm.value; // Store data
      console.log("✅ Form Data Submitted:", this.employeeData);
  
      // Simulate API call (Replace with actual API service)
      setTimeout(() => {
        console.log("✅ Submission Successful!");
        alert('Form submitted successfully!');
        this.isSubmitted = true; // Enable document generation
        
      }, 1000);
      
    } else {
      alert('❌ Please fill all required fields.');
    }
  }
  

  resetForm(): void {
    this.employeeForm.reset(); // Reset the form fields
    this.isSubmitted = false; // Reset submission flag
    this.employeeData = {}; // Clear stored data
  }
  

  generatePDF() {
    const content = this.pdfContent.nativeElement;
  
    // Apply text-underline-offset dynamically
    const underlinedElements = content.querySelectorAll('[data-underline]') as NodeListOf<HTMLElement>;
    underlinedElements.forEach((el: HTMLElement) => {
      el.style.textUnderlineOffset = '6px';
    });
  
    html2canvas(content, {
      scale: 2, 
      scrollX: 0,
      scrollY: 0,
      backgroundColor: null,  // Ensures transparent background
      removeContainer: true,  // Removes extra space from captured content
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = pdfWidth; // Fit exactly to PDF width
      const imgHeight = (contentHeight * imgWidth) / contentWidth; // Maintain aspect ratio
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Request_Letter.pdf');
  
      // Restore original styles after PDF generation
      underlinedElements.forEach((el: HTMLElement) => {
        el.style.textUnderlineOffset = '';
      });
    });
  
    this.isDropdownOpen = false;
  }
  

  async generateWord() {
    if (!this.isSubmitted) {
      alert('❌ Please submit the form first!');
      return;
    }

    console.log("📄 Generating Word Document...");
    const paragraphs: Paragraph[] = Object.entries(this.employeeData).map(([key, value]) =>
      new Paragraph({ children: [new TextRun({ text: `${key}: ${value}`, bold: true })] })
    );

    const doc = new Document({ sections: [{ children: paragraphs }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'Request_Letter.docx');
    console.log("✅ Word Document Downloaded Successfully");
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
