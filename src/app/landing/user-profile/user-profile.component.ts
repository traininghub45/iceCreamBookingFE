import { Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '../../core/component/validation-message/validation-message.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../shared/interfaces/user-model';
import { UserService } from '../../shared/services/user.service';
import { TokenService } from '../../shared/services/auth/token.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
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
export class UserProfileComponent implements OnInit {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  private messageService= inject(MessageService);
  private userService= inject(UserService);
  private tokenService =  inject(TokenService);
  profileForm!: FormGroup;
  currentUser!: User;
  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    const user = this.authService.currentUserSignal();
    if (user) {
      this.currentUser = user;
      this.buildForm(user);
      this.imagePreview = user.userImgProfile
      ? `${environment.imageUrl}/${user.userImgProfile}`
      : null;
    }
      
  }

  buildForm(user: User){
    this.profileForm = this.fb.group({
      id: [user.id],
      fullName: [user.fullName, Validators.required],
      userName: [user.userName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phoneNumber: [user.phoneNumber || '', [Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      userImgProfile: [null],
      creationDate: [new Date().toISOString()],
      createdBy : ['Admin']
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileForm.patchValue({ userImgProfile: file });
      this.profileForm.get('userImgProfile')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
    
    // Append all form values except the image
    Object.entries(this.profileForm.value).forEach(([key, value]) => {
      if (key !== 'userImgProfile' && value !== null) {
        formData.append(key, value != null ? value.toString() : '');
      }
    });
  
    // Append the image file if it exists
    const imageControl = this.profileForm.get('userImgProfile');
    if (imageControl?.value instanceof File) {
      formData.append('file', imageControl.value);
    }
  
    this.userService.updateUser(formData).subscribe({
      next: (result: User) => {
        this.tokenService.saveUser(result);
        this.authService.initializeCurrentUser();
        this.messageService.add({
          severity: 'success',
          summary: 'Profile updated successfully',
          life: 3000
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error updating profile',
          detail: err.message,
          life: 3000
        });
      }
    });
  }

}
