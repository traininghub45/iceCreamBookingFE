import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService  // Inject UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
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

  // Handle form submission
  onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    // Construct user object from form values
    const user: User = {
      fullName: this.registrationForm.get('fullName')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
      creationDate : new Date(),
      createdBy : 'Admin'
    };

    // Call the UserService to add the user
    this.userService.addUser(user).subscribe(
      response => {
        console.log('User registered successfully:', response);
        // Redirect to login or another page on success
        this.router.navigate(['auth/login']);
      },
      error => {
        console.error('Error registering user:', error);
        this.errorMessage = 'There was an error registering your account. Please try again later.';
      }
    );
  }

  // Convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  get email() {
    return this.registrationForm.controls['email'];
  }

  get password() {
    return this.registrationForm.controls['password'];
  }

  get confirmPassword() {
    return this.registrationForm.controls['confirmPassword'];
  }

  get fullName() {
    return this.registrationForm.controls['fullName'];
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
