import { Component, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-request-letter',
  standalone : false,
  templateUrl: './rlp.component.html',
  styleUrls: ['./rlp.component.css']
})
export class RlpComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  currentDate = new Date().toLocaleDateString();

  company = {
    name: 'LG CNS India Pvt. Ltd.'
  };

  employee = {
    name: 'Ishmeet Singh',
    passportNo: '875875875',
    visaNo: '123456789',
    address: 'Sector 62, Noida'
  };

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
