import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analytics-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './analytics-products.component.html',
  styleUrl: './analytics-products.component.scss'
})
export class AnalyticsProductsComponent {

  products: any[] = [];
  selectedMonth!: number;
  selectedYear!: number;
  constructor(private adminService: AdminService){}

  ngOnInit(){
    const now = new Date();
    this.selectedMonth = now.getMonth() + 1;
    this.selectedYear = now.getFullYear();

    this.analyticsProducts();
  }

  analyticsProducts() {
    this.products = [];
    this.adminService.getProductStaticstics(this.selectedMonth, this.selectedYear).subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.thumbnail;
          this.products.push(element);
        });
      },
      error: (err) => {
        console.error('Lỗi khi tải thống kê sản phẩm:', err);
      }
    });
  }

}
