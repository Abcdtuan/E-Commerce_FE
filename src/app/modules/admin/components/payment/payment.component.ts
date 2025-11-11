import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  payments: any [] = [];
  showUpdate = false;
  selectedPaymentId: number | null = null;
  paymentForm!: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder,
              private snack: MatSnackBar
  ){

  }
  ngOnInit(): void{
    this.paymentForm = this.fb.group({
      amountPaid: [null, [Validators.required]],
      amountRefunded: [null, [Validators.required]],
      refundReason: [null, [Validators.required]],
    });
    this.getAllPayments();
  }

  getAllPayments(){
    this.adminService.getAllPayments().subscribe(res=>{
      console.log(res);
      this.payments = res;
    })
  }
  openRefund(payment: any){
    this.showUpdate = true;
    this.selectedPaymentId = payment.id;
    this.paymentForm.patchValue({
      amountPaid: payment.amountPaid,
      amountRefunded: payment.amountRefunded,
      refundReason: payment.refundReason,
    });
  }
  close(){
    this.showUpdate = false;
    this.paymentForm.reset();
  }
  updatePayment() {
    if (!this.paymentForm.valid) return;
    const data = { id: this.selectedPaymentId, ...this.paymentForm.value };
    this.adminService.refundPayment(data).subscribe({
      next: () => {
        this.snack.open('Điền thông tin thành công!', 'Đóng', { duration: 2000 });
        this.getAllPayments();
        this.close();
      },
      error: () => this.snack.open('Có lỗi xảy ra', 'Đóng', { duration: 2000 })
    });
  }
  
  
  

}
