import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from './service/emp-rg.service';

@Component({
  selector: 'app-emp-rg',
  standalone: false,
  templateUrl: './emp-rg.component.html',
  styleUrls: ['./emp-rg.component.css']
})
export class EmpRgComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  searchEmployeeId: string = '';
  searchEmployeeName: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees];
      },
      error: (err) => console.error('Error fetching employees:', err)
    });
  }

  filterEmployees(): void {
    let filtered = [...this.employees];

    // Filter by Employee ID
    if (this.searchEmployeeId.trim()) {
      filtered = filtered.filter(emp =>
        emp.employeeId.toString().includes(this.searchEmployeeId)

      );
    }

    // Filter by Employee Name
    if (this.searchEmployeeName.trim()) {
      filtered = filtered.filter(emp =>
        emp.employeeName.toLowerCase().includes(this.searchEmployeeName.toLowerCase())
      );
    }

    // Filter by Date Range
    if (this.fromDate || this.toDate) {
      const from = this.fromDate ? new Date(this.fromDate).getTime() : 0;
      const to = this.toDate ? new Date(this.toDate).setHours(23, 59, 59, 999) : Infinity;

      filtered = filtered.filter(emp => {
        const empDate = new Date(emp.joiningDate).getTime();
        return empDate >= from && empDate <= to;
      });
    }

    this.filteredEmployees = filtered;
  }

  clearFilters(): void {
    this.searchEmployeeId = '';
    this.searchEmployeeName = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredEmployees = [...this.employees];
  }

  viewEmployee(employee: Employee): void {
    this.router.navigate(['/dashboard/employees/employee-mst'], { state: { employee } });
  }

  addNewEmployee(): void {
    this.router.navigate(['/dashboard/employees/employee-mst']);
  }
}
