import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';
import { FooterComponent } from '../footer/footer.component';
import { AdvertisementComponent } from '../advertisement/advertisement.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatDividerModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatChipsModule, FooterComponent, AdvertisementComponent, RouterModule, MatOptionModule, MatSelectModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  page: number = 0;
  size: number = 12;
  totalPages: number = 0;
  products: any[] = [];
  searchProducts!: FormGroup;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,
              private customerService: CustomerService) { }
  

  ngOnInit() {
    this.loadProducts();
    this.searchProducts = this.fb.group({
      title: [null, [Validators.required]]
    })
  }
  loadProducts() {
    this.products = [];
    this.customerService.getAllProducts(this.page, this.size).subscribe((res: any) => {
    this.totalPages = res.totalPages;
    res.content.forEach((productDto: any) => {
      const images = productDto.byteImages.map((imgByte: string) => ({
        processedImg: 'data:image/jpeg;base64,' + imgByte
      })) || [];
      const product = {
        ...productDto,
        images: images,
        thumbnail: images.length > 0 ? images[0].processedImg : ''
      };

      this.products.push(product);
    });
    if (this.page >= 1) {
        this.sortProducts();
    }
  });
  }
  sortProducts() {
    this.products.sort((a, b) => this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  }

  
  changeSort(order: 'asc' | 'desc') {
    this.sortOrder = order;
    if (this.page >= 1) {
      this.sortProducts();
    }
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadProducts();
    }
  }
  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }
  submitSearch() {
    this.products = [];
    const title = this.searchProducts.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe((res: any[]) => {
      res.forEach((productDto: any) => {     
        const images = productDto.byteImages.map((imgByte: string) => ({
          processedImg: 'data:image/jpeg;base64,' + imgByte
        }));
        const product = {
          ...productDto,
          images: images,
          thumbnail: images.length > 0 ? images[0].processedImg : ''
        };
        this.products.push(product);
        });
      });
  }

  addProductToCart(id: any) {
    this.customerService.addProductToCart(id).subscribe({
      next: (res) => {
        this.snackBar.open('Thêm sản phẩm thành công!', 'Đóng', {
          duration: 3000,
      })
    }, error: (error) => {
      this.snackBar.open('Sản phẩm đã có trong giỏ hàng!', 'Đóng', {
        duration: 3000
      });
      
      
    }
    })
  }

  

}
