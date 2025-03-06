import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,  // Keeping it false
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  const credentials = { username: this.username, password: this.password };

  this.authService.login(credentials).subscribe(
    (response) => {
      console.log("Backend Response:", response);

      if (response.status) {
        // Store username and userId safely
        localStorage.setItem('username', this.username);
        if (response.UserId) {
          localStorage.setItem('userId', String(response.UserId));
        } else {
          console.warn("UserId is undefined or null");
        }

        this.router.navigate(['/dashboard/home']);
      } else {
        alert(response.message);
      }
    },
    (error) => {
      console.error('Login error:', error);
      alert('Login failed!');
    }
  );
}

    
  }
  