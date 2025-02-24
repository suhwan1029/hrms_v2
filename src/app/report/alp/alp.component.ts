import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-alp',
  standalone: false,
  templateUrl: './alp.component.html',
  styleUrl: './alp.component.css'
})
export class AlpComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  offerLetter = {
    employeeName: 'Ishmeet Singh',
    location: 'Noida',
    offerDate: 'October 15, 2024',
    companyName: 'ABC India Pvt. Ltd',
    companyAddress: '3rd Floor, Stellar OKAS 1425, Sector 142, NOIDA - 201305',
    designation: 'Associate',
    compensation: 'Rs.3,00,000/- per annum',
    officeTiming: '8:00 AM to 5:00 PM',
    joiningDate: 'November 4, 2024', 
    acceptanceDate: 'October 18, 2024',
    managingDirector: 'Abc '
  };

  employee = {
    name: 'Ishmeet Singh',
    location: 'Noida',
    designation: 'Associate',
    empNo: '00000000',
    salary: '99999',
    professionalLevel: 'P3',
    joiningDate: '05-11-2024',

    level: 'P3',
    compensation: [
      { id: 1, name: 'Basic', amount: 50000 },
      { id: 2, name: 'HRA', amount: 20000 },
      { id: 3, name: "Company's contribution to PF", amount: 5000 },
      { id: 4, name: 'Flexi Benefits', amount: 10000 }
    ],
    grossMonthly: 85000,
    annualizedGross: 1020000,
    performanceIncentive: 50000,
    annualGross: 1070000,
    welfareBenefits: [
      { id: 1, name: 'Birthday & Diwali Gifts', amount: 5000 },
      { id: 2, name: 'Lunch on premises', amount: 'Not Applicable' },
      { id: 3, name: 'Group mediclaim, personal accident, and term life insurance', amount: 'As per company policy' }
    ],
    totalWelfare: 5000,
    ctcBeforeGratuity: 1075000,
    gratuity: 25000,
    ctc: 1100000
  };

  generatePDF() {
    console.log('Generate PDF function triggered');
  
    if (this.pdfContent && this.pdfContent.nativeElement) {
      html2canvas(this.pdfContent.nativeElement, { scale: 1 }).then(canvas => {
        console.log('Canvas generated');
  
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft > 0) {
          position -= pageHeight; // Fix: Properly position the new pages
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        console.log('Image added to PDF successfully');
        pdf.save(`Offer_Letter_${this.offerLetter.employeeName}.pdf`);
      }).catch(err => console.error('Error generating PDF:', err));
    } else {
      console.error('Error: Element #pdfContent not found or not initialized!');
    }
  }
  
}
