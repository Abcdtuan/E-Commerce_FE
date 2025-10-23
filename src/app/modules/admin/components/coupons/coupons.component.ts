import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatTableModule,ReactiveFormsModule ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent {
  
  coupons: any[] = [];

  couponForm!: any;

  showUpdate = false;

  selectedCouponId: number | null = null;

  constructor(
    private adminService: AdminService,
    private snack: MatSnackBar,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.couponForm = this.fb.group({
       name: [null, [Validators.required]],
       code: [null, [Validators.required]],
       discount: [null, [Validators.required]],
       expirationDate: [null, [Validators.required]]
    })
    this.getAllCoupons();
  }
  
  getAllCoupons(){
    this.adminService.getAllCoupons().subscribe(res =>{
      this.coupons = res;
    })
  }

  deleteCoupon(id: number){
    this.adminService.deleteCoupon(id).subscribe({
      next: (res) => {
        this.snack.open("Coupon deleted successfully", "Close", {
          duration: 2000,
        });
        this.getAllCoupons(); 
      }
    })
  }
  openUpdate(coupon: any) {
    this.showUpdate = true;
    this.selectedCouponId = coupon.id;
    this.couponForm.patchValue({
      name: coupon.name,
      code: coupon.code,
      discount: coupon.discount,
      expiryDate: coupon.expiryDate
    })
  }
  close() {
    this.showUpdate = false;
    this.couponForm.reset();
  }
  updateCoupon(){
    if(this.couponForm.valid){
      const couponDto = this.couponForm.value;
      if(this.selectedCouponId !== null){
        this.adminService.updateCoupon(this.selectedCouponId, couponDto).subscribe(()=>{
          this.getAllCoupons();
          this.close();
        }
        )
      }
    }
  }  
}
