import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-low-stock-produts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './low-stock-produts.component.html',
  styleUrl: './low-stock-produts.component.scss'
})
export class LowStockProdutsComponent {

  products: any[] = [];
  constructor( private adminService: AdminService) {}

  ngOnInit(){
    this.lowStockProduts();
  }

  lowStockProduts(){
    this.adminService.getLowStockProducts().subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.thumbnail;
          this.products.push(element);
        });
      },
      error: (err) => {
        console.error('Lỗi khi tải thống kê sản phẩm:', err);
      }
    })
  }
}
