import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [CommonModule, MatCardModule,RouterLink, MatRadioModule, FormsModule, MatFormFieldModule, MatLabel, MatSelectModule, MatOptionModule],
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.scss'
})
export class CategoryProductComponent {

  categoryId: number;
  products: any[] = [];
  brands: any[] = [];
  brandId: number | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  
  

  constructor(private customerService: CustomerService, private activateRoute: ActivatedRoute){
    this.categoryId = this.activateRoute.snapshot.params['categoryId'];
    this.brandId = activateRoute.snapshot.params['brandId'];
  }
  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.categoryId = +params['categoryId']; 
      this.getAllProductsByCategoryId();
      this.getBrandByCategoryId();
      this.getAllProductsByCategoryIAndBrandId();
      this.sortProducts();
    });
  }

  getAllProductsByCategoryId() {
    this.products = [];
    this.customerService.getProductsByCategoryId(this.categoryId).subscribe((res: any[]) => {
      this.products = this.mapProducts(res);
    });
  }
  getBrandByCategoryId(){
    this.customerService.getBrandByCategoryId(this.categoryId).subscribe(res=>{
      this.brands = res;
      console.log(res)
    })
  }
  getAllProductsByCategoryIAndBrandId() {
    if (this.brandId == null) {
      this.getAllProductsByCategoryId();
      return;
    }

    this.products = [];
    this.customerService.getAllProductsByCategoryIdAndBrandId(this.categoryId, this.brandId)
      .subscribe((res: any[]) => {
        this.products = this.mapProducts(res);
      });
  }
  filterByBrand(brandId: number | null) {
    this.brandId = brandId;
    this.getAllProductsByCategoryIAndBrandId();
    this.sortProducts();
  }

  private mapProducts(res: any[]): any[] {
    return res.map((productDto: any) => {
      const images = productDto.byteImages.map((imgByte: string) => ({
        processedImg: 'data:image/jpeg;base64,' + imgByte
      }));
      return {
        ...productDto,
        images,
        thumbnail: images.length > 0 ? images[0].processedImg : ''
      };
    });
  }
  sortProducts() {
  this.products.sort((a, b) => {
    if (this.sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}
 


}
