import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UserLogin } from '../../shared/interfaces/user-login-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed typo (styleUrl -> styleUrls)
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private authService: AuthService,) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      let userLogin: UserLogin = {
        userName: email,
        password: password
      };

      // Use AuthService to handle login
      this.authService.login(userLogin).subscribe(
        response => {
          console.log('Login successful:', response);
          // Navigate or handle success
          this.router.navigate(['dashboard']); // Example: Redirect to dashboard
        },
        error => {
          console.error('Login failed:', error);
          // Handle error
        }
      );
    }
  }

  goToRegistraion() {
    this.router.navigate(['auth/registration']);
  }
}
