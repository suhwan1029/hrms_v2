import { Component, OnInit } from '@angular/core';
import { AppMstService } from './service/app-mst.service';

@Component({
  selector: 'app-app-mst',
  standalone:false,
  templateUrl: './app-mst.component.html',
  styleUrls: ['./app-mst.component.css']
})
export class AppMstComponent implements OnInit {
  departmentId: number | null = null; // Holds selected department ID
  departmentCode: string = ''; // Selected department code
  departmentName: string = ''; // Selected department name
  activeStatus: string = 'N'; // Status (Y/N)
  approvalList: any[] = []; // Approval list
  isEditing: boolean = true;
  departmentList: any[] = []; // Stores department list from API

  constructor(private appMstService: AppMstService) {}

  ngOnInit() {
    this.loadDepartments(); // Load departments on init
    this.initializeApprovalRows(); // Initialize approval rows
  }

  /**
   * Load department list from API
   */
  loadDepartments() {
    this.appMstService.getDepartments().subscribe({
      next: (response) => {
        console.log('API Response:', response); // Debugging

        if (Array.isArray(response)) {
          // If API returns an array directly
          this.departmentList = response;
        } else if (response && typeof response === 'object' && 'status' in response && 'data' in response) {
          // If API response is an object with `status` and `data`
          if (response.status === 'success' && Array.isArray(response.data)) {
            this.departmentList = response.data;
          } else {
            console.error('Invalid response format:', response);
          }
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching department list:', error);
      }
    });
  }

  /**
   * Fetch department details based on selected department code
   */
  fetchDepartmentDetails() {
    if (!this.departmentCode) {
      this.departmentId = null;
      this.departmentName = '';
      this.activeStatus = 'N';
      return;
    }

    const selectedDept = this.departmentList.find(dept => dept.departmentCode === this.departmentCode);
    
    if (selectedDept) {
      this.departmentId = selectedDept.departmentId;
      this.departmentName = selectedDept.departmentName;
      this.activeStatus = selectedDept.enableFlag || 'N'; // Default to 'N' if not set
      this.initializeApprovalRows();
    } else {
      console.warn('Selected department not found in the list.');
    }
  }

  /**
   * Initialize approval rows with 5 empty records
   */
  initializeApprovalRows() {
    this.approvalList = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      approvalName: '',
      approvalEmail: '',
      activeStatus: 'Y'
    }));
  }

  /**
   * Add a new approval row
   */
  addApprovalRow() {
    this.approvalList.push({
      id: this.approvalList.length + 1,
      approvalName: '',
      approvalEmail: '',
      activeStatus: 'Y'
    });
  }

  /**
   * Remove an approval row (minimum 5 must remain)
   */
  removeApprovalRow(index: number) {
    if (this.approvalList.length > 5) {
      this.approvalList.splice(index, 1);
    } else {
      alert('At least 5 rows should be present.');
    }
  }

  /**
   * Toggle department active status (checkbox)
   */
  toggleActiveStatus(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.activeStatus = isChecked ? 'Y' : 'N';
  }

  /**
   * Save department and approvals to API
   */
  saveChanges() {
    if (!this.departmentCode) {
      alert('Please select a department before saving.');
      return;
    }
  
    const updatedData = {
      departmentId: this.departmentId ?? 0, // Ensure departmentId is always a number
      departmentCode: this.departmentCode,
      departmentName: this.departmentName,
      activeStatus: this.activeStatus,
      enableFlag: this.activeStatus, // Assuming enableFlag follows activeStatus
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
  
  /**
   * Toggle approval row active status (checkbox)
   */
  toggleApprovalStatus1(event: Event, approval: any) {
    const target = event.target as HTMLInputElement;
    approval.activeStatus = target.checked ? 'Y' : 'N';
  }
}
