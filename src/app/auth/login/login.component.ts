import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '../../core/validation-message/validation-message.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    ToastModule 
  ],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router,
     private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value)
      .subscribe({
        complete: () => {
          this.router.navigate(['dashboard/home']);
        },
        error: (err) => {
          this.showErrorMessage(err);
        }
      });
  }

  private showErrorMessage(error: any): void {
    let detail = 'An unexpected error occurred';
    if (error.status === 401) {
      detail = 'Invalid username or password';
    } else if (error.status === 0) {
      detail = 'Unable to connect to server';
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: detail,
      life: 5000
    });
  }

  goToRegistraion() {
    this.router.navigate(['auth/registration']);
  }
}
