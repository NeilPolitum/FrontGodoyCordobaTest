import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.errorMessage = '';
        localStorage.setItem('token', response.token);
        this.router.navigate(['/gestion-usuarios']);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}