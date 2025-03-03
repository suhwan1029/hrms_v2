import { Component } from '@angular/core';
import { DeptMstService } from './service/dept-mst.service';

@Component({
  selector: 'app-app-mst',
  standalone: false,
  templateUrl: './app-mst.component.html',
  styleUrls: ['./app-mst.component.css']
})
export class AppMstComponent {
  departmentCode: string = '';
  departmentName: string = '';
  activeStatus: string = '';
  approvalList: any[] = [];
  isEditing: boolean = true; // Form is editable by default

  constructor(private deptService: DeptMstService) {}

  // Fetch department details from service
  fetchDepartmentDetails() {
    if (!this.departmentCode) {
      alert('Please enter a Department Code');
      return;
    }

    this.deptService.getDepartmentDetails(this.departmentCode).subscribe(
      (data) => {
        this.departmentName = data.departmentName;
        this.activeStatus = data.activeStatus;
        this.approvalList = data.approvals || []; // Ensure list is not null
      },
      (error) => {
        console.error('Error fetching department details:', error);
        alert('Department not found!');
      }
    );
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

  // Save edited data (send to API)
  saveChanges() {
    const updatedData = {
      departmentCode: this.departmentCode,
      departmentName: this.departmentName,
      activeStatus: this.activeStatus,
      approvals: this.approvalList
    };

    this.deptService.updateDepartmentDetails(updatedData).subscribe(
      (response) => {
        alert('Changes saved successfully!');
      },
      (error) => {
        console.error('Error saving changes:', error);
        alert('Failed to save changes.');
      }
    );
  }
}
