import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, 
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router) {
  }
  ngOnInit(){
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      password:[null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }
  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }
  onsubmit(){
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.snackbar.open('Passwords do not match', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        this.snackbar.open('Đăng ký thành công', 'Đóng', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackbar.open('Đăng ký thất bại', 'Đóng', { duration: 5000, panelClass: 'error-snackbar' });
      }
    });
  }
}
