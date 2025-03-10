import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-request-letter',
  standalone:false,
  templateUrl: './ulp.component.html',
  styleUrls: ['./ulp.component.css']
})
export class UlpComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  currentDate = new Date().toLocaleDateString();
  employee: any = {};  // Holds employee data

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // ✅ Extract query parameters and store in `employee` object
    this.route.queryParams.subscribe(params => {
      this.employee = {
        title: params['title'] || '',  // ✅ Added title field
        name: params['name'] || 'N/A',
        passportNo: params['passportNo'] || 'N/A',
        md: params['md'] || 'N/A',
        designation: params['designation'] || 'N/A',
        companyName: params['companyName'] || 'ABC India Private Limited',
        companyAddress: params['companyAddress'] || 'Sector 62, Noida, Uttar Pradesh, India',
        address: params['address'] || 'N/A'
      };
      console.log("🔍 Received Employee Data:", this.employee); // ✅ Debugging
    });
  }

  generatePDF() {
    const content = this.pdfContent.nativeElement;

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Request_Letter.pdf');
    });
  }
}
