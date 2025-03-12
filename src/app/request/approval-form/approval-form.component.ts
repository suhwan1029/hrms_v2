import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ApprovalData {
  requestNo: string;
  deptCode: string;
  approvals: { name: string; email: string; status: string; remarks: string }[];
}

@Component({
  selector: 'app-approval-form',
  standalone: false,
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css'],
})
export class ApprovalFormComponent {
  displayedColumns: string[] = ['name', 'email', 'status', 'remarks'];

  constructor(
    public dialogRef: MatDialogRef<ApprovalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public approvalData: ApprovalData,
    private snackBar: MatSnackBar
  ) {}

  onClose(): void {
    if (confirm('Are you sure you want to exit without saving?')) {
      this.dialogRef.close();
    }
  }

  onSave(): void {
    if (this.isFormValid()) {
      console.log('Saved Data:', this.approvalData);
      this.dialogRef.close(this.approvalData);
    } else {
      this.snackBar.open('Please fill all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

  private isFormValid(): boolean {
    return this.approvalData.approvals.every(
      (item) => item.name && item.email && item.status
    );
  }
}
