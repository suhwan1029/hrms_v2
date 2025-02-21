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
         
        const message: string = response.message;
        const userId: string = response.UserId;
        const status: boolean = response.status;
        const role: string = response.role;
        const menu: string = response.menu;
        
        console.log("Backend Response:", response);
        if (response.status) {
          // Store username and userId in localStorage
          localStorage.setItem('username', this.username);
          localStorage.setItem('userId', String(response.UserId));

          alert(response.message);
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
