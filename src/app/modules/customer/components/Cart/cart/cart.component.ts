import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { CommonModule } from '@angular/common';
import {  MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../../place-order/place-order.component';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule,  
    MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule,PlaceOrderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: any[] = [];
  availableCouponList: any[] = [];
  showCoupons: boolean = false;
  order: any;
  couponForm!: any;
  errorMessage: string = '';
  

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private snack: MatSnackBar,
              private dialog: MatDialog
  ){}

  ngOnInit(): void{
    this.couponForm = this.fb.group({
      code: [null,[Validators.required]]
    })
    this.getCartByUserId();
  }

  getCartByUserId(){
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(res =>{
      this.order = res
      res.cartItems.forEach((element: any) =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element)
      })
      console.log(this.cartItems)
    })
  }
  applyCoupon(couponId: number){
  this.customerService.applyCoupon(couponId).subscribe({
    next: (res) => {
      this.snack.open("thêm mã giảm giá thành công","Oke",{
        duration: 3000
      });
      this.getCartByUserId();
    },
    error: (err) => {
      this.errorMessage = err.error?.message;
      this.snack.open(this.errorMessage, "Oke", {
      duration: 3000
     })
    }
    });
  }
  availableCoupons(){
    this.customerService.avaialableCoupons().subscribe({
      next: (res) => {
        this.availableCouponList = res;
        console.log(res)
        this.showCoupons = true;
      }
    })
  }
  increaseQuantity(productId: any){
    this.customerService.increaseQuantity(productId).subscribe({
      next: (res) => {
        this.getCartByUserId();
      }
        
  })
  }
  decreaseQuantity(productId: any){
    this.customerService.decreaseQuantity(productId).subscribe({
      next: (res) => {
        this.getCartByUserId();
      }
        
  })
  }
  deleteCartItem(cartItemsId: any){
    this.customerService.deleteCartItem(cartItemsId).subscribe({
      next: (res) => {
        this.snack.open("Xóa sản phẩm thành công","Oke",{
          duration: 3000
        });
        this.getCartByUserId();
      }
      })
    
  }
  placeOrder(){
    this.dialog.open(PlaceOrderComponent, {
      width: '600px',  // tăng chiều rộng
      maxWidth: '90vw', // responsive, tối đa 90% màn hình
    });

    
  }
  
}
