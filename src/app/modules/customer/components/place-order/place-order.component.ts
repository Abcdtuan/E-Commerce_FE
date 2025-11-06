import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatError,MatRadioModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  placeOrderForm!: FormGroup;
  
  

  constructor(private customerService: CustomerService,
    private snack: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
    
  ) {  }

  ngOnInit(): void{
    this.placeOrderForm = this.fb.group({
      name:[null, Validators.required],
      address: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      orderDescription: [null],
      paymentMethod: [null, [Validators.required]]
    })
  }
  placeOrder() {
    if (this.placeOrderForm.invalid) return;

    const formValue = this.placeOrderForm.value;
    console.log("Dữ liệu gửi đi:", formValue);

    this.customerService.placeOrder(formValue).subscribe({
      next: (res) => {
        if (formValue.paymentMethod === 'CASH') {
          // --- Xử lý tiền mặt ---
          this.snack.open("Đặt hàng thành công! Thanh toán tiền mặt khi nhận hàng.", "Đóng", { duration: 2000 });
          this.closeForm();
        } else if (formValue.paymentMethod === 'TRANSFER') {
          // --- Xử lý chuyển khoản/VNPAY ---
          this.customerService.createPayment(res.id, res.amount, `Thanh toán đơn #${res.id}`)
            .subscribe({
              next: (payRes) => {
                window.location.href = payRes.url;
              },
              error: (err) => {
                this.snack.open("Lỗi tạo thanh toán: " + err.error.message, "Đóng", { duration: 2000 });
              }
            });
        } else {
          this.snack.open("Phương thức thanh toán không hợp lệ", "Đóng", { duration: 2000 });
        }
      },
      error: (err) => {
        this.snack.open("Đặt hàng thất bại: " + err.error.message, "Đóng", { duration: 2000 });
      }
    });
  }
  closeForm(){
    this.dialog.closeAll();
  }

}
