import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,  // Keeping it false
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === 'password') {
      localStorage.setItem('user', this.username);
      this.router.navigate(['/dashboard/home']); 
    } else {
      alert('Invalid credentials!');
    }
  }
  navigateToSignup() {
    this.router.navigate(['/signup']); 
  };
  
}
