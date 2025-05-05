import { Component, inject, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ValidationMessageComponent } from '../../shared/components/validation-message/validation-message.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth/auth.service';

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
    ToastModule,
    ModalComponent
  ],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  
  @ViewChild('forgotPassword') forgotPassword!: ModalComponent;
  loginForm!: FormGroup;
  forgotForm!: FormGroup;
  private userService = inject(UserService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.buildLoginForm();
    this.buildForgotForm();
  }

  buildForgotForm(){
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  buildLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmitLoginForm(): void {
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
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Failed to Login',
            life: 5000
          });        }
      });
  }

  ShowPopup(){
    this.forgotPassword.show()
  }

  onSubmitForgotForm() {
    if (this.forgotForm.invalid) {
      return;
    }

    this.userService.forgotPassword(this.forgotForm.value.email)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password reset link sent to your email',
            life: 5000
          });
          this.forgotPassword.hide();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Failed to send reset email',
            life: 5000
          });
        }
      });
  }

  goToRegistraion() {
    this.router.navigate(['auth/registration']);
  }
}