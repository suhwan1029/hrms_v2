import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RlfService } from './service/rlf.service'; // Import the service
import { jsPDF } from 'jspdf';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-rlf',
  standalone: false,
  templateUrl: './rlf.component.html',
  styleUrls: ['./rlf.component.css']
})
export class RlfComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  rlfForm: FormGroup;
  titleList: string[] = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.'];
  isDropdownOpen = false;
  
  searchId: number | null = null;
  // ✅ Initialize with a default number

  requestData: any = null; // Stores fetched request data
  errorMessage: string = ''; // Stores error message
  currentDate: string = formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  employee: any = {}; // Holds employee data

  constructor(private fb: FormBuilder, private rlfService: RlfService) {
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
      toaddress: [
        `The FRRO,
East Block-VIII, 
Level-II, Sector-1, 
R.K. Puram, New Delhi-110066`, 
        Validators.required
      ],
      empaddress: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  isSubmitted = false; // Initially false

 onSubmit(): void {
  if (this.rlfForm.valid) {
    // Store form data
    this.employee = this.rlfForm.value;

    console.log("Form Data:", this.employee); // ✅ Log form data before sending

    // Disable submit button to prevent duplicate submissions
    this.isSubmitted = false;

    this.rlfService.submitRlfForm(this.employee).subscribe({
      next: (response) => {
        console.log("API Response:", response);
        alert('Form submitted successfully!');

        // Enable "Create Document" button after successful submission
        this.isSubmitted = true;
      },
      error: (error) => {
        console.error("API Error:", error);
        alert('Error submitting form. Please check console for details.');

        // Keep "Create Document" disabled if submission fails
        this.isSubmitted = true;
      }
    });
  } else {
    console.warn('Form is invalid.');
    alert('Please fill in all required fields.');

    // Mark all fields as touched to show validation messages
    this.rlfForm.markAllAsTouched();

    // Focus on the first invalid field
    setTimeout(() => {
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        (firstInvalidControl as HTMLElement).focus();
      }
    });

    // Keep "Create Document" button disabled if form is invalid
    this.isSubmitted = false;
  }
}

  

resetForm(): void {
  this.rlfForm.reset();
  this.isSubmitted = false; // ❌ Disable "Create Document" on reset
  this.rlfForm.patchValue({
    currentDate: new Date().toISOString().slice(0, 10),
    toaddress: `The FRRO,
East Block-VIII, 
Level-II, Sector-1, 
R.K. Puram,
New Delhi-110066`
  });
}

 
 // Fetch request details by employee ID
 searchRequest(): void {
  if (this.searchId !== null && this.searchId !== undefined) { // ✅ Ensure searchId is a valid number
    this.rlfService.getRequestById(Number(this.searchId)).subscribe(
      (data) => {
        this.requestData = data;
        this.errorMessage = '';
      },
      (error) => {
        this.requestData = null;
        this.errorMessage = 'Request not found or error fetching data.';
      }
    );
  } else {
    this.errorMessage = 'Please enter a valid Employee ID.';
  }
}


  generatePDF() {
    console.log("🔍 Employee Data:", this.employee);
    console.log("📄 Generating PDF...");
  
    setTimeout(() => {
      if (!this.pdfContent || !this.pdfContent.nativeElement) {
        console.error("❌ PDF Content is not available!");
        return;
      }
  
      html2canvas(this.pdfContent.nativeElement, { scale: 2 }).then((canvas) => {
        console.log("📸 Canvas created for PDF");
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
        pdf.save('Offer_Letter.pdf');
        console.log("✅ PDF Downloaded Successfully");
      });
  
    }, 500); // Delay ensures proper rendering
  }
  

  async generateWord() {
    console.log("📄 Generating Word Document...");
    if (!this.pdfContent || !this.pdfContent.nativeElement) {
      console.error("❌ Word content is undefined!");
      return;
    }

    const paragraphs: Paragraph[] = [];

    this.pdfContent.nativeElement.childNodes.forEach((node: ChildNode) => {
      if (node.nodeType === Node.TEXT_NODE) {
        paragraphs.push(new Paragraph({ text: node.textContent || '' }));
      } else if (node instanceof HTMLElement) {
        console.log("🔍 Processing HTML Element:", node.tagName);
        const textRunOptions: any = {
          text: node.innerText || '',
          bold: node.style.fontWeight === "bold" || node.tagName === "B",
          italics: node.style.fontStyle === "italic" || node.tagName === "I",
          underline: node.hasAttribute('data-underline') ? { type: "single" } : undefined,
          size: this.getFontSize(node.style.fontSize),
        };

        const paragraphOptions: any = {
          children: [new TextRun(textRunOptions)]
        };

        if (node.tagName.startsWith('H')) {
          paragraphOptions.heading = HeadingLevel.HEADING_1;
        }

        paragraphs.push(new Paragraph(paragraphOptions));
      }
    });

    console.log("📑 Creating Word Document...");
    const doc = new Document({
      sections: [{ properties: {}, children: paragraphs }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'Request_Letter.docx');
      console.log("✅ Word Document Downloaded Successfully");
    });

    this.isDropdownOpen = false;
  }

  getFontSize(cssSize: string | null): number {
    if (!cssSize) return 22; // Default size
    const size = parseFloat(cssSize);
    return isNaN(size) ? 22 : size * 2; // Convert px to Word font size
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  formatAddress(address: string): string {
    return address ? address.replace(/,/g, ',<br>') : '';
  }

  formatEndDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
