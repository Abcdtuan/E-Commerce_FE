import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatDividerModule, MatButtonModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule
  , MatIcon, MatChipsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  products: any[] = [];
  searchProducts!: FormGroup;
  page: number = 0;
  size: number = 12;
  totalPages: number = 0; 
  constructor(private adminService: AdminService, 
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar
   ) { }

  ngOnInit(){
    this.loadProducts();
    this.searchProducts = this.fb.group({  
      title: [null,[Validators.required]],
    });

  }

  loadProducts() {
  this.products = [];
  this.adminService.getAllProducts(this.page, this.size).subscribe((res: any) => {
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
  });
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

  this.adminService.getAllProductsByName(title).subscribe((res: any[]) => {
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

    console.log(this.products);
  });
  }

  deleteProduct(id: number){
    this.adminService.deleteProduct(id).subscribe({
      next: (res) =>{
        this.matSnackBar.open("Product Deleted Successfully", "Close", {
          duration: 3000,
        })
        this.loadProducts();
      },
    error: (err) =>{
      this.matSnackBar.open("Error Deleting Product", "Close", {
          duration: 3000,
        }
    )}
    })
  }

}
