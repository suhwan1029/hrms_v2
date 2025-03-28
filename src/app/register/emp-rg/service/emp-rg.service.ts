import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  orgId: string;
  employeeId: number;
  employeeNo: string;
  employeeName: string;
  gender: string;
  englishName: string;
  emailId: string;
  employeeType: string;
  job: string;
  title: string;
  jobPosition: string;
  promotionDate: string;
  enteringDate: string;
  lgEnteringDate: string;
  recruitmentType: string;
  birthDate: string;
  dateOfRetirement: string;
  leaveClassification: string;
  hiringType: string;
  resignDate: string;
  lastWorkingDate: string;
  designation: string;
  grade: string;
  bloodGroup: string;
  mobileNumber: string;
  department: string;
  maritalStatus: string;
  passportNo: string;
  employeeImage: string;
  confirmationDate: string;
  contractType: string;
  workLocation: string;
  reportingManager: string;
  employeeStatus: string;
  career: string;
  graduateSchool: string;
  periodOfLeave: string;
  nationality: string;
  vacation: string;
  virtualUser: string;
  officialPhoneNumber: number;
  mobileNo: string;
  externalEmail: string;
  homeAddress: string;
  panNumber: string;
  aadharNumber: number;
  uanNumber: string;
  resignationDate: string;
  status: 'Active' | 'Inactive';
  joiningDate: string;

  experience: Experience[];
  education: Education[];
  promotion: Promotion[];
  qualification: Qualification[];
}

export interface Experience {
  companyName: string;
  jobTitle: string;
  department: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  instituteName: string;
  admissionDate: string;
  passoutDate: string;
  courseName: string;
  multipleSubCourse: string;
  graduationCategory: string;
  degreeName: string;
}

export interface Promotion {
  promotionCode: string;
  promotionType: string;
  positionLevel: string;
  oldDesignation: string;
  newDesignation: string;
  effectiveFromDate: string;
  effectiveToDate: string;
}

export interface Qualification {
  qualificationName: string;
  qualificationLevel: string;
  publisher: string;
  docNumber: string;
  qualificationDate: string;
  qualificationEvidenceCheck: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees'; // Update this URL based on your backend API

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}`);
  }
}
