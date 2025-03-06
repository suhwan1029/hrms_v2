import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeptMstService } from '../dept-mst/service/dept-mst.service';

@Component({
  selector: 'app-dept-mst',
  standalone: false, // ✅ Added standalone: false
  templateUrl: './dept-mst.component.html',
  styleUrls: ['./dept-mst.component.css']
})
export class DeptMstComponent implements OnInit {
  departmentForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isEditMode: boolean = false;
  departmentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private deptService: DeptMstService
  ) {
    this.departmentForm = this.fb.group({
      departmentId: [null],
      departmentCode: ['', [Validators.required, Validators.maxLength(50)]],
      departmentName: ['', [Validators.required, Validators.maxLength(240)]],
      hodName: ['', [Validators.required, Validators.maxLength(50)]],
      enableFlag: [true, Validators.required] // Store as boolean internally
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['departmentId']) {
        this.isEditMode = true;
        this.departmentId = params['departmentId'];

        this.departmentForm.patchValue({
          departmentId: params['departmentId'] ?? null,
          departmentCode: params['departmentCode'] ?? '',
          departmentName: params['departmentName'] ?? '',
          hodName: params['hodName'] ?? '',
          enableFlag: params['enableFlag']?.toUpperCase() === 'Y' // Convert 'Y'/'N' to boolean
        });
      }
    });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formValue = this.departmentForm.value;
      const updatedDepartment = {
        ...formValue,
        enableFlag: formValue.enableFlag ? 'Y' : 'N' // ✅ Convert boolean to 'Y' / 'N'
      };

      if (this.isEditMode) {
        if (!this.departmentId) {
          console.error('Invalid departmentId for update.');
          return;
        }

        this.deptService.updateDepartment(this.departmentId, updatedDepartment).subscribe({
          next: () => {
            this.successMessage = 'Department updated successfully!';
            this.showSuccessAndRedirect();
          },
          error: (error) => {
            console.error('Error updating department:', error);
            this.errorMessage = 'Failed to update department. Please try again.';
          }
        });
      } else {
        this.deptService.createDepartment(updatedDepartment).subscribe({
          next: () => {
            this.successMessage = 'Department successfully added!';
            this.showSuccessAndRedirect();
          },
          error: (error) => {
            console.error('Error adding department:', error);
            this.errorMessage = 'Failed to add department. Please try again.';
          }
        });
      }
    } else {
      console.error('Form is invalid:', this.departmentForm.errors);
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/dashboard/register/department-list']);
    }
  }

  private showSuccessAndRedirect(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/dashboard/register/department-list']);
    }, 3000); // ✅ Show success message for 3 seconds before redirecting
  }
}
