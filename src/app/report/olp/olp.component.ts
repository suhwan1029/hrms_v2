import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-olp',
  standalone: false,
  templateUrl: './olp.component.html',
  styleUrls: ['./olp.component.css']
})
export class OlpComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  offerLetter = {
    employeeName: 'Ishmeet Singh',
    location: '3rd Floor, Stellar OKAS 1425, Sector 142, NOIDA',
    offerDate: 'October 15, 2024',
    companyName: 'LG CNS India Pvt.Ltd',
    companyAddress: '3rd Floor, Stellar OKAS 1425, Sector 142, NOIDA - 201305',
    designation: 'Associate',
    compensation: 'Rs.3,00,000',
    officeTiming: '8:00 AM to 5:00 PM',
    joiningDate: 'November 4, 2024',
    acceptanceDate: 'October 18, 2024',
    managingDirector: 'Seong Woon Cheong '
  };

  employee = {
    name: 'Ishmeet Singh',
    designation: 'Associate',
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
      const offerLetterDivs: HTMLDivElement[] = Array.from(this.pdfContent.nativeElement.querySelectorAll('.offer-letter'));
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const marginLeft = 5;
      const marginTop = 10;
  
      let isFirstPage = true;
      let index = 0;
  
      // Function to temporarily remove borders
      const removeBorders = () => {
        offerLetterDivs.forEach(div => div.style.border = 'none');
      };
  
      // Function to restore original borders
      const restoreBorders = () => {
        offerLetterDivs.forEach(div => div.style.border = '');
      };
  
      removeBorders(); // Remove borders before capturing PDF
  
      const processDiv = () => {
        if (index >= offerLetterDivs.length) {
          restoreBorders(); // Restore borders after PDF generation
          console.log('PDF generated successfully');
          pdf.save(`Offer_Letters.pdf`);
          return;
        }
  
        const div = offerLetterDivs[index];
  
        html2canvas(div, { 
          scale: 2, 
          backgroundColor: null // Ensure a transparent background in PDF
        }).then(canvas => {
          console.log(`Canvas generated for div ${index + 1}`);
  
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - 2 * marginLeft;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
          if (!isFirstPage) {
            pdf.addPage();
          }
  
          pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
          isFirstPage = false;
  
          index++;
          processDiv();
        }).catch(err => {
          console.error(`Error generating PDF for div ${index + 1}:`, err);
          restoreBorders(); // Restore borders in case of an error
        });
      };
  
      processDiv();
    } else {
      console.error('Error: Element #pdfContent not found or not initialized!');
    }
  }
  
  
  
}
