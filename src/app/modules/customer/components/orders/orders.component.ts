import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from '../../review/review.component';
import { AdminRoutingModule } from "../../../admin/admin-routing.module";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, AdminRoutingModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: any[] = [];

  constructor(private customerService: CustomerService,
              private dialog: MatDialog
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

  getAllOrders() {
    this.customerService.getOrdersByUserId().subscribe(res => {
      console.log(res)
      this.orders = res;
    })
  }
  

}
