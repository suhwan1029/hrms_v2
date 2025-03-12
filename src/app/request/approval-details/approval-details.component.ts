import { Component } from '@angular/core';

interface Approver {
  id: number;
  name: string;
  email: string;
  status: string;
  remarks: string;
}

@Component({
  selector: 'app-approval-details',
  standalone:false,
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css']
})
export class ApprovalDetailsComponent {
  approvalData = {
    requestNo: 'RFR202502252',
    deptCode: 'GDC0001',
    deptName: 'GLOBAL DELIVERY CENTER',
    approvals: [
      { id: 1, name: 'NEYAZ', email: 'neyaz@gmail.com', status: 'APPROVED', remarks: 'OK' },
      { id: 2, name: 'SUKHWINDER', email: 'sukh@gmail.com', status: 'APPROVED', remarks: 'OK2' },
      { id: 3, name: 'AJAY', email: 'ajay@gmail.com', status: 'APPROVED', remarks: '' },
      { id: 4, name: 'DEEPAK TIMSINA', email: 'deepak@gmail.com', status: 'APPROVED', remarks: '' }
    ]
  };

  statuses = ['APPROVED', 'PENDING', 'REJECTED'];

  addApprover(): void {
    const newId = this.approvalData.approvals.length + 1;
    this.approvalData.approvals.push({ id: newId, name: '', email: '', status: 'PENDING', remarks: '' });
  }

  removeApprover(index: number): void {
    if (this.approvalData.approvals.length > 1) {
      this.approvalData.approvals.splice(index, 1);
    } else {
      alert('At least one approver is required.');
    }
  }

  onSave(): void {
    console.log('Saving Data:', this.approvalData);
    alert('Approval details saved successfully!');
  }

  onClose(): void {
    console.log('Dialog closed');
  }
}
