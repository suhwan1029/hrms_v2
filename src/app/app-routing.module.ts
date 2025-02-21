import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './setting/setting.component';
import { RfrComponent } from './request/rfr/rfr.component';
import { MasterComponent } from './request/master/master.component';
import { OrganizationFormComponent } from './request/master/organization-form/organization-form.component';
import { PartnerFormComponent } from './request/master/partner-form/partner-form.component';
import { ViewRequestComponent } from './request/view-request/view-request.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AllAttendancesComponent } from './attendances/all-attendances/all-attendances.component';
import { AttendanceComponent } from './attendances/attendance/attendance.component';
import { AttendanceCalendarComponent } from './attendances/attendance-calendar/attendance-calendar.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { LeaveComponent } from './leave/leave.component';
import { CalendarComponent } from './leave/calendar/calendar.component';
import { LeaveReportComponent } from './leave/leave-report/leave-report.component';
import { RequestLeaveComponent } from './leave/request-leave/request-leave.component';
import { PoliciesComponent } from './policies/policies.component';
import { AttendancePoliciesComponent } from './policies/attendance-policies/attendance-policies.component';
import { BenefitsPoliciesComponent } from './policies/benefits-policies/benefits-policies.component';
import { HrPoliciesComponent } from './policies/hr-policies/hr-policies.component';
import { RequestComponent } from './request/request.component';
import { SystemSettingsComponent } from './admin/system-settings/system-settings.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, 
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { 
        path: 'admin', 
        children: [ 
          { path: '', component: RequestComponent },
          { path: 'system-settings', component: SystemSettingsComponent },
          { path: 'user-management', component: UserManagementComponent }    
        ] 
      },
      { 
        path: 'attendances', 
        children: [ 
          { path: '', component: RequestComponent },
          { path: 'all-attendances', component: AllAttendancesComponent },
          { path: 'attendance', component: AttendanceComponent },
          { path: 'attendance-calendar', component: AttendanceCalendarComponent }      
        ]  
      },
      { 
        path: 'employees', 
        children: [ 
          { path: '', component: RequestComponent },
          { path: 'add-employee', component: AddEmployeeComponent },
          { path: 'employee-details', component: EmployeeDetailsComponent },
          { path: 'employee-list', component: EmployeeListComponent }    
        ] 
      },
      { 
        path: 'leave', 
        children: [ 
          { path: '', component: RequestComponent },
          { path: 'calendar', component: CalendarComponent },
          { path: 'leave-report', component: LeaveReportComponent },
          { path: 'request-leave', component: RequestLeaveComponent }     
        ]  
      },
      { 
        path: 'policies', 
        children: [ 
          { path: '', component: RequestComponent },
          { path: 'attendance-policies', component: AttendancePoliciesComponent },
          { path: 'benefits-policies', component: BenefitsPoliciesComponent },
          { path: 'hr-policies', component: HrPoliciesComponent }    
        ]  
      },
      { 
        path: 'request', 
        children: [  
          { path: '', component: RequestComponent }, 
          { path: 'rfr', component: RfrComponent }, 
          { path: 'view-request', component: ViewRequestComponent }
        ]
      },
      { 
        path: 'master',  
        children: [  
          { path: '', component: RequestComponent }, 
          { path: 'organization-form', component: OrganizationFormComponent }, 
          { path: 'partner-form', component: PartnerFormComponent } 
        ] 
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }