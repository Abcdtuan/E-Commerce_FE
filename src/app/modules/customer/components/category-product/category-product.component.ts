import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [CommonModule, MatCardModule,RouterLink],
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.scss'
})
export class CategoryProductComponent {

  categoryId: number;
  products: any[] = [];

  constructor(private customerService: CustomerService, private activateRoute: ActivatedRoute){
    this.categoryId = this.activateRoute.snapshot.params['categoryId'];
  }
  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.categoryId = +params['categoryId']; 
      this.getAllProductsByCategoryId();
    });
  }

  getAllProductsByCategoryId(){
    this.products = []
    this.customerService.getProductsByCategoryId(this.categoryId).subscribe((res: any[]) =>{
      res.forEach((productDto: any) => {
      const images = productDto.byteImages.map((imgByte: string) => ({
        processedImg: 'data:image/jpeg;base64,' + imgByte
      })) ;
      const product = {
        ...productDto,
        images: images,
        thumbnail: images.length > 0 ? images[0].processedImg : ''
      };
      this.products.push(product);
    });
    })
  }


}
