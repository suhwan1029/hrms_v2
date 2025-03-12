import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router

interface RFR {
  rfrNo: string;
  rfrDate: string;  
  organizationGroup: string;
  projectName: string;
  numberOfPositions: number;
  designation: string;
  experience: number;
  vacancyType: string;
  status: string;
}

@Component({
  selector: 'app-rfr-list',
  standalone: false,
  templateUrl: './rfr-list.component.html',
  styleUrls: ['./rfr-list.component.css']
})
export class RfrListComponent implements OnInit {
  RFRList: RFR[] = [];  
  filteredRFRList: RFR[] = [];  
  fromDate: string = '';
  toDate: string = '';

  constructor(private router: Router) {} // ✅ Inject Router

  ngOnInit(): void {
    this.loadSampleData();
  }

  loadSampleData() {
    this.RFRList = [
      { rfrNo: 'Anubhav001', rfrDate: '2024-03-10', organizationGroup: 'Tech Solutions Ltd.', projectName: 'AI Development', numberOfPositions: 5, designation: 'Software Engineer', experience: 3, vacancyType: 'Permanent', status: 'Open' },
      { rfrNo: 'RFR-2024-002', rfrDate: '2024-03-08', organizationGroup: 'DataCorp', projectName: 'Big Data Analysis', numberOfPositions: 2, designation: 'Data Scientist', experience: 5, vacancyType: 'Contract', status: 'Closed' },
      { rfrNo: 'RFR-2024-003', rfrDate: '2024-02-25', organizationGroup: 'FinTech Innovations', projectName: 'Banking App Development', numberOfPositions: 4, designation: 'Full Stack Developer', experience: 4, vacancyType: 'Permanent', status: 'Open' },
      { rfrNo: 'RFR-2024-004', rfrDate: '2024-02-20', organizationGroup: 'CloudTech', projectName: 'Cloud Security Enhancement', numberOfPositions: 3, designation: 'Cybersecurity Analyst', experience: 6, vacancyType: 'Contract', status: 'Closed' }
    ];
    this.applySorting();
    this.filteredRFRList = [...this.RFRList]; 
  }

  applySorting() {
    this.RFRList.sort((a, b) => {
      if (a.status === 'Open' && b.status === 'Closed') return -1;
      if (a.status === 'Closed' && b.status === 'Open') return 1;
      return 0;
    });
  }

  filterByDate() {
    if (this.fromDate && this.toDate) {
      this.filteredRFRList = this.RFRList.filter(rfr => {
        const rfrDate = new Date(rfr.rfrDate).getTime();
        const from = new Date(this.fromDate).getTime();
        const to = new Date(this.toDate).getTime();
        return rfrDate >= from && rfrDate <= to;
      });
    } else {
      this.filteredRFRList = [...this.RFRList];
    }
  }

  clearFilters() {
    this.fromDate = '';
    this.toDate = '';
    this.filteredRFRList = [...this.RFRList];
  }

  addNewRFR() {
    alert('Add New RFR functionality to be implemented!');
  }

  // ✅ Fixed View RFR Function
  viewRFR(rfr: RFR) {
    if (rfr.status === 'Closed') {
      alert('This RFR is closed and cannot be viewed.');
      return;
    }
    
    // ✅ Navigate to the RFR form
    this.router.navigate(['/dashboard/request/rfr', rfr.rfrNo]);
  }
}
