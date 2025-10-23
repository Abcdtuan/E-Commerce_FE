import { map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, CommonModule, MatSelectModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  productId!: number;
  product: any;

  reviewList: any[] = []
  currentImageIndex: number = 0;

  existingImg: string  | null = null;



  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { 
    this.productId = this.activatedRoute.snapshot.params['productId'];
  }

  ngOnInit(): void {
    this.productDetails();
    this.getAllReviewsByProductId();
  }

  productDetails(){
    this.customerService.getProductById(this.productId).subscribe(res=>{
      const images = res.byteImages.map((imgByte: string) => ({
        processedImg: 'data:image/jpeg;base64,' + imgByte
      }))
      this.product = {
        ...res,
        images: images,
      }
      this.currentImageIndex = 0;
        
    })
  }
  nextImage() {
    if (!this.product || !this.product.images) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
  }

  prevImage() {
    if (!this.product || !this.product.images) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }
  addProductToCart(id: any) {
    this.customerService.addProductToCart(id).subscribe({
      next: (res) => {
        this.snackBar.open('Thêm sản phẩm thành công!', 'Close', {
          duration: 3000,
      })
    }, error: (error) => {
      this.snackBar.open('Sản phẩm đã có trong giỏ hàng!', 'Close', {
        duration: 3000
      });
      
      
    }
    })
  }

    getAllReviewsByProductId() {
    this.customerService.getReviewByProductId(this.productId).subscribe((res: any[]) => {
      console.log('Review response:', res); 
      this.reviewList = res.map(review => {
        const reviewImages = review.byteImages?.map((imgByte: string) => ({
          processedReviewImg: 'data:image/jpeg;base64,' + imgByte
        })) || [];

        return {
          ...review,
          images: reviewImages
        };
      });
    });
  }
  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }

}
