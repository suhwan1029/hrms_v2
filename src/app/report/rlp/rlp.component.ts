import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import html2canvas from 'html2canvas';
import { RlpService } from './service/rlp.service'; // Import the service

@Component({
  selector: 'app-request-letter',
  standalone: false,
  templateUrl: './rlp.component.html',
  styleUrls: ['./rlp.component.css']
})
export class RlpComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  isDropdownOpen = false;
  currentDate: string = formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  employee: any = {}; // Holds employee data

  constructor(private route: ActivatedRoute, private rlpService: RlpService) {} // Inject service

  ngOnInit() {
    console.log("🔄 Component Initialized");

    this.route.queryParams.subscribe(params => {
      const empId = params['empId'] || 'defaultEmpId'; // Get Employee ID from query params
      this.fetchEmployeeData(empId);
    });
  }

  fetchEmployeeData(empId: string) {
    console.log(`📡 Fetching Employee Data for ID: ${empId}`);
    
    this.rlpService.getEmployeeData(empId).subscribe(
      data => {
        this.employee = data;
        console.log("📥 Employee Data Loaded:", this.employee);
      },
      error => {
        console.error("❌ Error Fetching Employee Data:", error);
      }
    );
  }

  generatePDF() {
    console.log("📄 Generating PDF...");
    const content = this.pdfContent.nativeElement;
    
    if (!content) {
      console.error("❌ PDF Content is not available!");
      return;
    }

    html2canvas(content, { scale: 2 }).then((canvas) => {
      console.log("📸 Canvas created for PDF");
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Request_Letter.pdf');
      console.log("✅ PDF Downloaded Successfully");
    });

    this.isDropdownOpen = false;
  }

  async generateWord() {
    console.log("📄 Generating Word Document...");
    const content = this.pdfContent?.nativeElement;

    if (!content) {
      console.error("❌ Word content is undefined!");
      return;
    }

    const paragraphs: Paragraph[] = [];

    content.childNodes.forEach((node: ChildNode) => {
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
