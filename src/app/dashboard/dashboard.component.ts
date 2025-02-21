import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false, 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = {
    name: '',
    employeeId: '',
    profilePic: '1.jpg'
  };

  openMenu: string | null = null;
  openSubMenu: string | null = null;
  isCollapsed: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve username and userId from localStorage
    this.user.name = localStorage.getItem('username') || 'Admin';
    this.user.employeeId = localStorage.getItem('userId') || 'EMP12345';
  }

  logout() {
    if (confirm('Do you want to logout?')) {
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
    }
  }

  toggleMenu(menu: string) {
    if (menu === 'requests') {
      this.openMenu = this.openMenu === 'requests' ? null : 'requests';
      this.openSubMenu = null;
    } else if (menu === 'master') {
      this.openSubMenu = this.openSubMenu === 'master' ? null : 'master';
    }
  }

  isDisabled: boolean = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }
}
