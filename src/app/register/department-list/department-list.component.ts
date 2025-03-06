import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService, Department } from '../department-list/Service/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  standalone: false // ✅ Ensure it's part of an Angular module
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: Department | null = null;
  departmentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      departmentId: [''],
      departmentCode: [''],
      departmentName: [''],
      hodName: [''],
      enableFlag: [false] // ✅ For form checkbox (true/false)
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        console.log('Fetched Departments:', departments);
        this.departments = departments; // ✅ Ensure data matches Department[]
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.departments = [];
      }
    });
  }

  selectDepartment(department: Department) {
    this.selectedDepartment = department;
    this.departmentForm.patchValue({
      ...department,
      enableFlag: department.enableFlag === 'Yes' // ✅ Convert "Yes"/"No" to boolean for the form
    });
  }

  onSubmit() {
    const formValue = this.departmentForm.value;
    const updatedDepartment: Department = {
      ...formValue,
      enableFlag: formValue.enableFlag ? 'Yes' : 'No' // ✅ Convert boolean back to "Yes"/"No"
    };

    console.log('Updated Department Data:', updatedDepartment);
  }

  viewDepartment(department: Department | null): void {
    if (department) {
      this.router.navigate(['/dashboard/master/dept-mst'], { 
        queryParams: { 
          departmentId: department.departmentId,
          departmentCode: department.departmentCode,
          departmentName: department.departmentName,
          hodName: department.hodName,
          enableFlag: department.enableFlag
        }
      });
    } else {
      this.router.navigate(['/dashboard/master/dept-mst']);
    }
  }

  addNewDepartment(): void {
    this.router.navigate(['/dashboard/master/dept-mst']);
  }
}
