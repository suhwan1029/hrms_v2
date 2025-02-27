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
    if (menu === 'master' || menu === 'report' || menu === 'requests' || menu === 'register') {
      if (this.openMenu === menu) {
        this.openMenu = null;  // Close the menu if it's already open
        this.openSubMenu = null;
      } else {
        this.openMenu = menu;
        this.openSubMenu = menu;  // Ensure submenus work properly
      }
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
