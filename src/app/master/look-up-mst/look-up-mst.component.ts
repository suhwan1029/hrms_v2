import { Component, OnInit } from '@angular/core';
import { LookupMstService } from './service/lookup-mst.service'; 
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any; 

@Component({
  selector: 'app-look-up-mst',
  standalone: false,
  templateUrl: './look-up-mst.component.html',
  styleUrls: ['./look-up-mst.component.css']
})
export class LookUpMstComponent implements OnInit {
  lookupType: string = '';
  lookupMeaning: string = '';
  lookupDescription: string = '';
  lookupEntries: any[] = [];
  alertMessage: string = '';

  constructor(private lookupService: LookupMstService, private http: HttpClient) {}

  ngOnInit() {
    this.lookupEntries = Array.from({ length: 5 }, () => this.getEmptyRow());
  }

  getEmptyRow() {
    return {
      lookupCode: '',
      lookupValue: '',
      meaning: '',
      description: '',
      fromDate: '',
      toDate: '',
      activeStatus: false // Ensures all checkboxes are unchecked on display
    };
  }
  

  addLookupRow() {
    this.lookupEntries.push(this.getEmptyRow());
  }

  removeLookupRow(index: number) {
    if (this.lookupEntries.length > 5) {
      this.lookupEntries.splice(index, 1);
    } else {
      this.showAlert('At least 5 rows must remain.');
    }
  }

  saveChanges() {
    let formattedOutput = {
      lookupType: this.lookupType,
      Meaning: this.lookupMeaning,
      Description: this.lookupDescription,
      lookupEntries: this.lookupEntries
    };

    console.log('Formatted Lookup Data:', JSON.stringify(formattedOutput, null, 2));

    let hasError = false;

    this.lookupEntries.forEach(entry => {
      if (!entry.lookupCode || !entry.lookupValue) {
        hasError = true;
        return;
      }

      if (entry.id) {
        this.lookupService.updateLookup(entry).subscribe(
          () => console.log('Updated Entry:', entry),
          () => hasError = true
        );
      } else {
        this.lookupService.addLookup(entry).subscribe(
          response => {
            entry.id = response.id;
            console.log('Added Entry:', entry);
          },
          () => hasError = true
        );
      }
    });

    if (hasError) {
      this.showAlert('Error saving lookup data. Please check inputs.');
    } else {
      this.showAlert('Lookup data saved successfully.');
    }
  }

  showAlert(message: string) {
    this.alertMessage = message;
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    alertModal.show();
  }
  toggleCheckbox(entry: any, event: any) {
    entry.activeStatus = event.target.checked; // Toggle based on user interaction
    console.log(`Updated activeStatus for ${entry.lookupCode}:`, entry.activeStatus);
  }
  
  
  
}
