import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-post-coupon',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatFormFieldModule, MatLabel, MatInputModule, MatError, CommonModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {
  couponForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private adminService: AdminService,
              private route: Router,
              private snackbar: MatSnackBar

  ){}
  ngOnInit() {
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    })
    
  }
  addCoupon(){
    this.adminService.createCoupon(this.couponForm.value).subscribe(res =>{
      if(res != null){
        this.snackbar.open("Mã giảm giá đã được tạo thành công", "OK", 
          {
            duration: 3000,
          }
        )
        this.route.navigate(['admin/dashboard']);
      }else{
        this.snackbar.open("Mã giảm giá đã tồn tại", "OK", {
          duration: 3000,
        })
      }
    })
  }

}
