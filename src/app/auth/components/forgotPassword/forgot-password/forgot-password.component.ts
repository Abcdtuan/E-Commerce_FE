import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,FormsModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  
  email = '';
  otp = '';
  newPassword = '';
  step = 1;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  sendOtp() {
    this.authService.sendOtp(this.email).subscribe({
      next: (res) => {
        this.snackBar.open(res, 'Đóng', { duration: 3000 });
        this.step = 2;
      },
      error: () => this.snackBar.open('Không gửi được OTP', 'Đóng', { duration: 3000 })
    });
  }

  verifyOtp() {
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: (res) => {
        this.snackBar.open(res, 'Đóng', { duration: 3000 });
        if (res.includes('hợp lệ')) {
          this.step = 3;
        }
      },
      error: () => this.snackBar.open('OTP không hợp lệ', 'Đóng', { duration: 3000 })
    });
  }

  resetPassword() {
    this.authService.resetPassword(this.email, this.newPassword).subscribe({
      next: (res) => {
        this.snackBar.open(res, 'Đóng', { duration: 3000 });
        this.email = this.otp = this.newPassword = '';
        this.router.navigate(['/login'])
      },
      error: () => this.snackBar.open('Đổi mật khẩu thất bại', 'Đóng', { duration: 3000 })
    });
  }

}
