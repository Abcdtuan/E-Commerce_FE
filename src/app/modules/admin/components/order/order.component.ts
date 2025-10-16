import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatTableModule,MatMenuModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  orders: any[] = [];

  constructor(private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.adminService.getAllOrders().subscribe(res => {
      this.orders = res;
      console.log(this.orders)
    })
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

  changeOrderStatus(orderId: number, status: string) {
    this.adminService.changeOrderStatus(orderId, status).subscribe({
      next: (res) => {
        this.snackBar.open("Cập nhật trạng thái đơn hàng thành công", "Đóng", {});
        this.getAllOrders();
      }
    })
  }
 
}
