import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService, Department } from '../department-list/service/department.service';

@Component({
  selector: 'app-department-list',
  standalone: false, // ✅ Added standalone: false
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = []; // ✅ Fetch dynamically from API
  selectedDepartment: Department | null = null;
  departmentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      orgId: [''],
      departmentId: [''],
      departmentCode: [''],
      departmentName: [''],
      hodName: [''],
      enableFlag: [false] // ✅ Boolean flag
    });
  }

  ngOnInit(): void {
    this.loadDepartments(); // ✅ Fetch department data from API
  }

  // ✅ Fetch departments from API
  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      }
    });
  }

  // ✅ Select department and update form
  selectDepartment(department: Department) {
    this.selectedDepartment = department;
    this.departmentForm.patchValue({
      ...department,
      enableFlag: department.enableFlag === 'Yes'
    });
  }

  // ✅ Submit Form Data
  onSubmit() {
    const formValue = this.departmentForm.value;
    const updatedDepartment: Department = {
      ...formValue,
      enableFlag: formValue.enableFlag ? 'Yes' : 'No'
    };

    console.log('Updated Department Data:', updatedDepartment);
  }

  // ✅ Navigate to Department Master Form with selected department details
  viewDepartment(department: Department | null): void {
    if (department) {
      this.router.navigate(['/dashboard/master/dept-mst'], { 
        queryParams: { 
          orgId: department.orgId,
          departmentId: department.departmentId,
          departmentCode: department.departmentCode,
          departmentName: department.departmentName,
          hodName: department.hodName,
          enableFlag: department.enableFlag
        }
      });
    } else {
      this.router.navigate(['/dashboard/master/dept-mst']); // ✅ Open empty form for new department
    }
  }

  // ✅ Navigate to form for adding a new department
  addNewDepartment(): void {
    this.router.navigate(['/dashboard/master/dept-mst']);
  }
}
