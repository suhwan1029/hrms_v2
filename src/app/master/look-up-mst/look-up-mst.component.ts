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
    let filteredEntries = this.lookupEntries.filter(entry => 
      entry.lookupCode.trim() || entry.lookupValue.trim() || entry.meaning.trim() || 
      entry.description.trim() || entry.fromDate.trim() || entry.toDate.trim()
    );
  
    let formattedOutput = {
      lookupType: this.lookupType,
      meaning: this.lookupMeaning,
      description: this.lookupDescription,
      lookupEntries: filteredEntries.map(entry => ({
        lookupCode: entry.lookupCode,
        lookupValue: entry.lookupValue,
        meaning: entry.meaning,
        description: entry.description,
        fromDate: entry.fromDate,
        toDate: entry.toDate,
        activeStatus: entry.activeStatus === 'Y' ? 'Y' : 'N'
      }))
    };
  
    console.log(JSON.stringify(formattedOutput, null, 2));
  
    let hasError = false;
  
    filteredEntries.forEach(entry => {
      if (!entry.lookupCode || !entry.lookupValue) {
        hasError = true;
        return;
      }
  
      if (entry.id) {
        this.lookupService.updateLookup(entry).subscribe({
          next: () => {
            console.log('Lookup entry updated successfully:', entry);
            this.showAlert('Lookup entry updated successfully!');
          },
          error: (err) => {
            console.error('Error updating lookup entry:', err);
            this.showAlert('Failed to update lookup entry!');
            hasError = true;
          }
        });
      } else {
        this.lookupService.addLookup(formattedOutput).subscribe({
          next: (response) => {
            entry.id = response.id;
            console.log('Lookup entry added successfully:', entry);
            this.showAlert('Lookup entry added successfully!');
          },
          error: (err) => {
            console.error('Error adding lookup entry:', err);
            this.showAlert('Failed to add lookup entry!');
            hasError = true;
          }
        });
      }
    });
  }
  
  

  showAlert(message: string) {
    this.alertMessage = message;
    const alertModal = document.getElementById('alertModal');
  
    if (alertModal) {
      alertModal.removeAttribute('aria-hidden'); // ✅ Ensure the modal is accessible
      const modalInstance = new bootstrap.Modal(alertModal);
      modalInstance.show();
    }
  }
  
  toggleCheckbox(entry: any, event: any) {
    entry.activeStatus = event.target.checked ? 'Y' : 'N'; 
    console.log(`Updated activeStatus for ${entry.lookupCode}:`, entry.activeStatus);
  }
  
  
  
}
