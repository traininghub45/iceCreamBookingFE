import { Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ValidationMessageComponent } from '../../shared/components/validation-message/validation-message.component';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
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
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.buildForm();
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  buildForm() {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.resetForm.invalid || !this.token) {
      return;
    }

    this.userService.resetPassword(this.token, this.resetForm.value.newPassword)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password has been reset',
            life: 5000
          });
          this.router.navigate(['/auth/login']);
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
}