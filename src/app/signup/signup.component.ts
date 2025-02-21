import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullName: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSignUp() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup successful', {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
