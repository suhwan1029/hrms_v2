import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeptMstService } from '../dept-mst/service/dept-mst.service'; // ✅ Import service

@Component({
  selector: 'app-dept-mst',
  standalone:false,
  templateUrl: './dept-mst.component.html',
  styleUrls: ['./dept-mst.component.css']
})
export class DeptMstComponent implements OnInit {
  departmentForm: FormGroup;
  successMessage: string = '';
  isEditMode: boolean = false; // Track if editing
  departmentId: string | null = null; // ✅ Store departmentId

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private deptService: DeptMstService // ✅ Inject service
  ) {
    this.departmentForm = this.fb.group({
      orgId: [null, Validators.required],
      departmentId: [null], // Auto-generated for new department
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
        this.departmentId = params['departmentId']; // ✅ Store departmentId

        this.departmentForm.patchValue({
          orgId: params['orgId'],
          departmentId: params['departmentId'],
          departmentCode: params['departmentCode'],
          departmentName: params['departmentName'],
          hodName: params['hodName'],
          enableFlag: params['enableFlag'] === 'Yes' // Convert 'Yes'/'No' to boolean
        });
      }
    });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formValue = this.departmentForm.value;
      const updatedDepartment = {
        ...formValue,
        enableFlag: formValue.enableFlag ? 'Yes' : 'No' // Convert boolean to 'Yes'/'No'
      };

      if (this.isEditMode && this.departmentId) { 
        this.deptService.updateDepartment(this.departmentId, updatedDepartment).subscribe({ // ✅ Pass departmentId
          next: () => {
            this.successMessage = 'Department updated successfully!';
            this.navigateToList();
          },
          error: (error) => {
            console.error('Error updating department:', error);
          }
        });
      } else {
        this.deptService.createDepartment(updatedDepartment).subscribe({
          next: () => {
            this.successMessage = 'Department successfully added!';
            this.navigateToList();
          },
          error: (error) => {
            console.error('Error adding department:', error);
          }
        });
      }
    } else {
      console.error('Form is invalid:', this.departmentForm.errors);
    }
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/dashboard/register/department-list']);
    }
  }

  private navigateToList(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/dashboard/register/department-list']);
    }, 1000);
  }
}
