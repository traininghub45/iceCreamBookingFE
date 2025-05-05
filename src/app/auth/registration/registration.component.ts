import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ValidationMessageComponent } from '../../shared/components/validation-message/validation-message.component';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
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
export class RegistrationComponent implements OnInit {
  private formBuilder = inject(FormBuilder) 
  private router = inject(Router) 
  private userService = inject(UserService) 

  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }
  
  buildForm(){
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      creationDate: [new Date().toISOString()],
      isActive :[true],
      createdBy : ['Admin']
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Custom validator to check if passwords match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.userService.addUser(this.registrationForm.value)
    .subscribe({
      complete: () => {
        this.router.navigate(['']);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
