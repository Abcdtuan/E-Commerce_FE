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

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatError],
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
      orderDescription: [null]
    })
  }
  placeOrder(){
    console.log("Dữ liệu gửi đi:", this.placeOrderForm.value);
    this.customerService.placeOrder(this.placeOrderForm.value).subscribe({
      next: (res) => {
        this.snack.open("Order placed successfully", "Close", {
          duration: 2000,
        });
        this.customerService.createPayment(res.id, res.amount, 'Thanh toán đơn #' + res.id)
          .subscribe({
            next: (res) => window.location.href = res.url,
            error: (err) => this.snack.open("Lỗi tạo thanh toán: " + err.error.message, "Close", { duration: 2000 })
          });
 
        this.closeForm();
      },
      error: (err) => {
        this.snack.open("Failed to place order: " + err.error.message, "Close", {
          duration: 2000,
        });
      }

    })
    
  }
  closeForm(){
    this.dialog.closeAll();
  }

}
