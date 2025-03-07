import { Component, OnInit } from '@angular/core';
import { AppMstService } from './service/app-mst.service';

@Component({
  selector: 'app-app-mst',
  standalone:false,
  templateUrl: './app-mst.component.html',
  styleUrls: ['./app-mst.component.css']
})
export class AppMstComponent implements OnInit {
  departmentCode: string = '';
  departmentName: string = '';
  activeStatus: string = '';
  approvalList: any[] = [];
  isEditing: boolean = true; // Form is editable by default

  departmentList: any[] = [  // Hardcoded department list
    { departmentCode: 'GDC0001', departmentName: 'GDC', activeStatus: 'Y' },
    { departmentCode: 'GDC0002', departmentName: 'Finance', activeStatus: 'N' },
    { departmentCode: 'GDC0003', departmentName: 'IT', activeStatus: 'N' },
    { departmentCode: 'GDC0004', departmentName: 'Operations', activeStatus: 'N' }
  ];

  constructor(private appMstService: AppMstService) {}  // Injecting the service

  ngOnInit() {
    this.loadDepartments();
  }

  // Load department list for dropdown (already hardcoded)
  loadDepartments() {
    // No API call needed since data is hardcoded
  }

  // Update department details when selecting from dropdown
  fetchDepartmentDetails() {
    if (!this.departmentCode) {
      this.departmentName = '';
      this.activeStatus = '';
      return;
    }

    const selectedDept = this.departmentList.find(dept => dept.departmentCode === this.departmentCode);
    if (selectedDept) {
      this.departmentName = selectedDept.departmentName;
      this.activeStatus = selectedDept.activeStatus === 'Y' ? 'Active' : 'Inactive';
      this.approvalList = []; // Reset approvals (optional)
    }
  }

  // Add a new row to the approval list
  addApprovalRow() {
    this.approvalList.push({
      approvalName: '',
      approvalEmail: '',
      activeStatus: 'Active'
    });
  }

  // Remove a specific row from the approval list
  removeApprovalRow(index: number) {
    this.approvalList.splice(index, 1);
  }

  // Save edited data and call API
  saveChanges() {
    const updatedData = {
      departmentCode: this.departmentCode,
      departmentName: this.departmentName,
      activeStatus: this.activeStatus,
      approvals: this.approvalList
    };

    this.appMstService.saveDepartment(updatedData).subscribe({
      next: (response) => {
        console.log('Response:', response);
        alert('Changes saved successfully!');
      },
      error: (error) => {
        console.error('Error saving data:', error);
        alert('Failed to save changes.');
      }
    });
  }
}
