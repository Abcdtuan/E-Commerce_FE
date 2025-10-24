import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader } from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, CommonModule, MatCard, MatCardHeader, MatCardModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent {

  searchOrderForm!: FormGroup

  order: any;

  statusMapping: { [key: string]: string } = {
    'PLACED': 'Đã đặt',
    'SHIPPED': 'Đang giao',
    'DELIVERED': 'Đã giao',
    'CANCELLED': 'Đã hủy'
  };

  constructor(private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchOrderForm = this.fb.group({
      trackingId: [null, [Validators.required]]
    })
  }
  submitForm(){
    this.authService.getOrderByTrackingId(this.searchOrderForm.get('trackingId')?.value).subscribe(res =>{
      console.log(res)
      this.order = res;
    })
  }
  getStatusInVietnamese(status: string): string {
    return this.statusMapping[status] || status;
  }
}
