import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatIcon, MatInputModule, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private snackBar: MatSnackBar

  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit(): void{
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe({
      next: () =>{
        this.snackBar.open('Đăng nhập thành công', 'Close', { duration: 3000 });
        if(UserStorageService.isAdminLoggedIn()){
          this.route.navigateByUrl('/admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()){
          this.route.navigateByUrl('/customer/dashboard');
        };
      },
      error: () => {
        this.snackBar.open('Đăng nhập thất bại', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    })
  }

}
