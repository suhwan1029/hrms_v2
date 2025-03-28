import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './setting/setting.component';
import { RfrComponent } from './request/rfr/rfr.component';

import { OrganizationFormComponent } from './master/organization-form/organization-form.component';
import { PartnerFormComponent } from './master/partner-form/partner-form.component';
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
import { AlpComponent } from './report/alp/alp.component';
import { OlpComponent } from './report/olp/olp.component';
import { RlpComponent } from './report/rlp/rlp.component';
import { UlpComponent } from './report/ulp/ulp.component';
import { OlfComponent } from './request/olf/olf.component';
import { RfrRgComponent } from './register/rfr-rg/rfr-rg.component';
import { AppMstComponent } from './master/app-mst/app-mst.component';
import { DeptMstComponent } from './master/dept-mst/dept-mst.component';
import { DepartmentListComponent } from './register/department-list/department-list.component';
import { UlfComponent } from './request/ulf/ulf.component';
import { LookUpMstComponent} from './master/look-up-mst/look-up-mst.component';
import { RlfComponent } from './request/rlf/rlf.component'
import { EmployeeMstComponent } from './employees/employee-mst/employee-mst.component'
import { ApprovalDetailsComponent } from './request/approval-details/approval-details.component'
import { RfrListComponent } from './register/rfr-list/rfr-list.component'
import { PartnerListComponent } from './register/partner-list/partner-list.component'
import { EmpRgComponent } from './register/emp-rg/emp-rg.component'

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
          { path: 'employee-mst', component: EmployeeMstComponent }  ,
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
          { path: 'rfr/:rfrNo', component: RfrComponent },
          { path: 'olf', component: OlfComponent }, 
          { path: 'ulf', component: UlfComponent }, 
          { path: 'rlf', component: RlfComponent }, 
          { path: 'approval-details', component: ApprovalDetailsComponent },
          { path: 'view-request', component: ViewRequestComponent }  
        ]
      },
      { 
        path: 'master',  
        children: [  
          { path: '', component: RequestComponent }, 
          { path: 'organization-form', component: OrganizationFormComponent }, 
          { path: 'partner-form', component: PartnerFormComponent },
          { path: 'dept-mst', component: DeptMstComponent } ,
          { path: 'app-mst', component: AppMstComponent }  ,
          { path: 'look-up-mst', component: LookUpMstComponent }  
        ] 
      },
      { 
        path: 'report',  
        children: [  
          { path: '', component: RequestComponent }, 
          { path: 'alp', component: AlpComponent }, 
          { path: 'olp', component: OlpComponent},
          { path: 'rlp', component: RlpComponent},
          { path: 'ulp', component: UlpComponent}    
        ] 
      },
      { 
        path: 'register',  
        children: [  
          { path: '', component: RequestComponent }, 
          { path: 'rfr-rg', component: RfrRgComponent},
          { path: 'rfr-list', component: RfrListComponent},
          { path: 'partner-list', component: PartnerListComponent},
          { path: 'department-list', component: DepartmentListComponent},
          { path: 'emp-rg', component: EmpRgComponent}      
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