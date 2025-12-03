import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  payments: any [] = [];
  filteredPayments: any[] = [];
  searchPaymentForm!: FormGroup;
  showUpdate = false;
  selectedPaymentId: number | null = null;
  paymentForm!: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder,
              private snack: MatSnackBar
  ){

  }
  ngOnInit(): void{
    this.searchPaymentForm = this.fb.group({
      name: [null, [Validators.required]],
    });
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
      this.filteredPayments = res;
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
  submitSearch() {
    const name = this.searchPaymentForm.value.name?.toLowerCase() || '';
    this.filteredPayments = this.payments.filter(p => 
      (p.name || '').toLowerCase().includes(name)
    );
  }
  
  
  
  

}
