import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun } from 'docx';
import html2canvas from 'html2canvas';

import '@popperjs/core';


@Component({
  selector: 'app-request-letter',
  standalone:false,
  templateUrl: './ulp.component.html',
  styleUrls: ['./ulp.component.css']
})
export class UlpComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  isDropdownOpen = false;
  currentDate: string = formatDate(new Date(), 'MMMM dd, yyyy', 'en-US');

  employee: any = {};  // Holds employee data

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // ✅ Extract query parameters and store in `employee` object
    this.route.queryParams.subscribe(params => {
      this.employee = {
        title: params['title'],   // ✅ Added title field
        name: params['name'],
        nationality: params['nationality'] ,
        passportNo: params['passportNo'] ,
        detail: params['detail']  ,
        md: params['md'] ,
        designation: params['designation'] ,
        companyName: params['companyName'] ,
        companyAddress: params['companyAddress'] ,
        address: params['address'] 
      };
      console.log("🔍 Received Employee Data:", this.employee); // ✅ Debugging
    });
  }

  generatePDF() {
    const content = this.pdfContent.nativeElement;
  
    // Apply text-underline-offset dynamically
    const underlinedElements = content.querySelectorAll('[data-underline]') as NodeListOf<HTMLElement>;
    underlinedElements.forEach((el: HTMLElement) => {
      el.style.textUnderlineOffset = '6px';
    });
  
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Request_Letter.pdf');
  
      // Restore original styles after PDF generation
      underlinedElements.forEach((el: HTMLElement) => {
        el.style.textUnderlineOffset = '';
      });
    });

    
    this.isDropdownOpen = false;
  }

  sendMail() {
    console.log("Sending Mail...");
    alert("Mail Sent!");
    this.isDropdownOpen = false; // Close dropdown
  }

  async generateWord() {
    const content = this.pdfContent?.nativeElement;
    if (!content) {
      console.error("Word content is undefined!");
      return;
    }

    const paragraphs: Paragraph[] = [];

    // ✅ Add Company Logo (if available)
    const logoUrl = "5.png"; // Update with your actual logo path
    const logoBuffer = await this.loadImageAsBuffer(logoUrl);

    if (logoBuffer) {
      paragraphs.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: logoBuffer,
              transformation: { width: 100, height: 60 }, // Adjust size
              type: "png" // 🔹 Explicitly define image type (png, jpeg, etc.)
            }),
            new TextRun("\n")
          ]
        })
      );

      
    this.isDropdownOpen = false; // Close dropdown after action
    }

    // ✅ Process Content and Extract Styles
    content.childNodes.forEach((node: ChildNode) => {
      if (node.nodeType === Node.TEXT_NODE) {
        paragraphs.push(new Paragraph({ text: node.textContent || '' }));
      } else if (node instanceof HTMLElement) {
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

    // ✅ Create and Save Word Document
    const doc = new Document({
      sections: [{ properties: {}, children: paragraphs }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'Request_Letter.docx');
    });
  }

  // ✅ Convert Image to ArrayBuffer (Fixes the error)
  async loadImageAsBuffer(imageUrl: string): Promise<ArrayBuffer | null> {
    try {
      const response = await fetch(imageUrl);
      return await response.arrayBuffer();
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  }

  // ✅ Convert Font Size to Word Units (default: 22)
  getFontSize(cssSize: string | null): number {
    if (!cssSize) return 22; // Default size
    const size = parseFloat(cssSize);
    return isNaN(size) ? 22 : size * 2; // Convert px to Word font size
  }

  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
  
  

