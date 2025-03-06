import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-olp',
  standalone: false,
  templateUrl: './olp.component.html',
  styleUrls: ['./olp.component.css']
})
export class OlpComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  
  employee: any = {}; // Empty until data is retrieved

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.employee = JSON.parse(decodeURIComponent(params['data']));
        console.log('Received Employee Data:', this.employee);
      } else {
        console.warn('No employee data received');
      }
    });
  }

  generatePDF() {
    console.log('Generate PDF function triggered');
  
    if (this.pdfContent && this.pdfContent.nativeElement) {
      const offerLetterDivs: HTMLDivElement[] = Array.from(this.pdfContent.nativeElement.querySelectorAll('.offer-letter'));
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const marginLeft = 5;
      const marginTop = 2;
  
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
