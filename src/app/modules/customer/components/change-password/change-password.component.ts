import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  user: any;

  passwordForm!: FormGroup

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router : Router
  ){}

  ngOnInit(){
    this.passwordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]]
    })
    
  }

  changePassword(){
    this.customerService.changePassword(this.passwordForm.value).subscribe({
      next: res =>{
        this.snackBar.open('Thay đổi mật khẩu thành công', "Đóng", {
          duration: 2000,
        })
        this.router.navigate(['/customer/profile'])
      },
      error: (err) => {
        this.snackBar.open("Thay đổi mật khẩu không thành công: "  , "Close", {
          duration: 2000,
        });
      }
    })
  }



}
