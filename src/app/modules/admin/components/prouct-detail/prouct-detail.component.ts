
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';
import { AdminService } from '../../service/admin.service';
import { CustomerService } from '../../../customer/service/customer.service';

@Component({
  selector: 'app-prouct-detail',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, CommonModule, MatSelectModule],
  templateUrl: './prouct-detail.component.html',
  styleUrl: './prouct-detail.component.scss'
})
export class ProuctDetailComponent {

    productId!: number;

    product: any;

    reviewList: any[] = []
    currentImageIndex: number = 0;

    existingImg: string  | null = null;

    constructor(private  adminService: AdminService,
        private customerService: CustomerService,
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
    this.adminService.getProductById(this.productId).subscribe(res=>{
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
