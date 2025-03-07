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
  isEditing: boolean = true;
  departmentList: any[] = []; // Now empty, will be populated dynamically

  constructor(private appMstService: AppMstService) {}

  ngOnInit() {
    this.loadDepartments();
    this.initializeApprovalRows();
  }

  loadDepartments() {
    this.appMstService.getDepartments().subscribe({
      next: (data) => {
        this.departmentList = data;
      },
      error: (error) => {
        console.error('Error fetching department list:', error);
        alert('Failed to load departments.');
      }
    });
  }

  fetchDepartmentDetails() {
    if (!this.departmentCode) {
      this.departmentName = '';
      this.activeStatus = '';
      return;
    }

    const selectedDept = this.departmentList.find(dept => dept.departmentCode === this.departmentCode);
    if (selectedDept) {
      this.departmentName = selectedDept.departmentName;
      this.activeStatus = selectedDept.activeStatus;
      this.initializeApprovalRows();
    }
  }

  initializeApprovalRows() {
    this.approvalList = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      approvalName: '',
      approvalEmail: '',
      activeStatus: 'Y'
    }));
  }

  addApprovalRow() {
    this.approvalList.push({
      id: this.approvalList.length + 1,
      approvalName: '',
      approvalEmail: '',
      activeStatus: 'Y'
    });
  }

  removeApprovalRow(index: number) {
    if (this.approvalList.length > 5) {
      this.approvalList.splice(index, 1);
    } else {
      alert('At least 5 rows should be present.');
    }
  }

  toggleActiveStatus(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.activeStatus = isChecked ? 'Y' : 'N';
  }

  saveChanges() {
    if (!this.departmentCode) {
      alert('Please select a department before saving.');
      return;
    }

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
