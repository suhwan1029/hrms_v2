import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 

// Import necessary modules
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';
import { RequestComponent } from './request/request.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { PoliciesComponent } from './policies/policies.component';
import { SignupComponent } from './signup/signup.component';
import { RequestLeaveComponent } from './leave/request-leave/request-leave.component';
import { LeaveReportComponent } from './leave/leave-report/leave-report.component';
import { CalendarComponent } from './leave/calendar/calendar.component';
import { AttendanceComponent } from './attendances/attendance/attendance.component';
import { AllAttendancesComponent } from './attendances/all-attendances/all-attendances.component';
import { AttendanceCalendarComponent } from './attendances/attendance-calendar/attendance-calendar.component';
import { BenifitsComponent } from './benifits/benifits.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SystemSettingsComponent } from './admin/system-settings/system-settings.component';
import { PerformancesComponent } from './performances/performances.component';
import { AddPerformanceComponent } from './performances/add-performance/add-performance.component';
import { AllPerformancesComponent } from './performances/all-performances/all-performances.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { AttendancePoliciesComponent } from './policies/attendance-policies/attendance-policies.component';
import { PerformancePoliciesComponent } from './policies/performance-policies/performance-policies.component';
import { BenefitsPoliciesComponent } from './policies/benefits-policies/benefits-policies.component';
import { HrPoliciesComponent } from './policies/hr-policies/hr-policies.component';
import { ViewRequestComponent } from './request/view-request/view-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RfrComponent } from './request/rfr/rfr.component';

import { OrganizationFormComponent } from './master/organization-form/organization-form.component';
import { PartnerFormComponent } from './master/partner-form/partner-form.component';
import { ReportComponent } from './report/report.component';
import { AlpComponent } from './report/alp/alp.component';
import { OlpComponent } from './report/olp/olp.component';
import { RlpComponent } from './report/rlp/rlp.component';
import { UlpComponent } from './report/ulp/ulp.component';
import { OlfComponent } from './request/olf/olf.component';
import { DeptMstComponent } from './master/dept-mst/dept-mst.component';
import { AppMstComponent } from './master/app-mst/app-mst.component';
import { RegisterComponent } from './register/register.component';
import { RfrRgComponent } from './register/rfr-rg/rfr-rg.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeaveComponent,
    RequestComponent,
    AdminComponent,
    EmployeesComponent,
    AttendancesComponent,
    PoliciesComponent,
    SignupComponent,
    RequestLeaveComponent,
    LeaveReportComponent,
    CalendarComponent,
    AttendanceComponent,
    AllAttendancesComponent,
    AttendanceCalendarComponent,
    BenifitsComponent,
    UserManagementComponent,
    SystemSettingsComponent,
    PerformancesComponent,
    AddPerformanceComponent,
    AllPerformancesComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    AttendancePoliciesComponent,
    PerformancePoliciesComponent,
    BenefitsPoliciesComponent,
    HrPoliciesComponent,
    ViewRequestComponent,
    DashboardComponent ,
    RfrComponent,
    OrganizationFormComponent,
    PartnerFormComponent,
    ReportComponent,
    AlpComponent,
    OlpComponent,
    RlpComponent,
    UlpComponent,
    OlfComponent,
    DeptMstComponent,
    AppMstComponent,
    RegisterComponent,
    RfrRgComponent

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }