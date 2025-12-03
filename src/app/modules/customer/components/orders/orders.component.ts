import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminRoutingModule } from "../../../admin/admin-routing.module";
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, AdminRoutingModule,MatTabsModule, MatButtonModule,],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: any[] = [];
  selectedTab: number = 0; 
  statusMap: string[] = ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(private customerService: CustomerService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }
  getStatusClass(status: string | null | undefined): string {
    if (!status) {
      return 'status-placed';
    }
    const statusLower = status.toLowerCase();
    return `status-${statusLower}`;
  }
  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PLACED': 'Đã đặt',
      'SHIPPED': 'Đang giao',
      'DELIVERED': 'Đã giao',
      'CANCELLED': 'Đã hủy'
    };
    return statusMap[status] || status;
  }

  formatCurrency(amount: number | null | undefined): string {
    if (!amount) {
      return '0 ₫';
    }
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }
  filteredOrders() {
    const status = this.statusMap[this.selectedTab];
    return this.orders.filter(o => o.orderStatus === status);
  }

  getAllOrders() {
    this.customerService.getOrdersByUserId().subscribe(res => {
      console.log(res)
      this.orders = res;
    })
  }
  changeOrderStatus(orderId: number, newStatus: string) {
    this.customerService.changeOrderStatus(orderId, newStatus).subscribe({
      next: (res) => {
        this.getAllOrders();
        this.snackBar.open('Cập nhật trạng thái đơn hàng thành công', 'Đóng', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open('Cập nhật trạng thái đơn hàng thất bại', 'Đóng', { duration: 2000 });
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
      }
    });
  }
  
  

}
