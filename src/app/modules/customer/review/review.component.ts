import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from '../../../auth/services/storage/user-storage.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    MatCardModule, 
    CommonModule, 
    MatDividerModule, 
    MatListModule, 
    MatButtonModule, 
    MatDialogModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  orderId!: number;
  orderProductDetailsList: any[] = [];
  totalAmount: any;

  constructor(
    private customerService: CustomerService,
    private activateRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.orderId = this.activateRoute.snapshot.params['orderId'];
  }

  ngOnInit(): void {
    this.getOrderProductsById();
  }

  getOrderProductsById() {
    this.customerService.getOrderProductsById(this.orderId).subscribe(res => {
      res.productDtoList.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.thumbnail;
        this.orderProductDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
      console.log(this.orderProductDetailsList);
    });
  }

  onReviewProduct(product: any) {
    console.log("🧩 Product được truyền vào dialog:", product);
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '700px',
      maxWidth: '90vw',
      data: { product },
      disableClose: false,
      panelClass: 'review-dialog-container'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitReview(product.id, result);
      }
    });
  }

  submitReview(productId: number, reviewData: any) {
    const formData = new FormData();
    
    reviewData.files.forEach((file: File) => {
      formData.append('images', file);
    });
    
    formData.append('rating', reviewData.formData.rating);
    formData.append('description', reviewData.formData.description);
    formData.append('productId', productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());
    
    this.customerService.giveReview(formData).subscribe({
      next: (res) => {
        if (res.id !== null) {
          this.snackbar.open("Đánh giá sản phẩm thành công!", "Đóng", {
            duration: 3000,
          });
          const index = this.orderProductDetailsList.findIndex(p => p.id === productId);
          if(index !== -1) this.orderProductDetailsList[index].reviewed = true;
        }
      },
      error: () => {
        this.snackbar.open("Gửi đánh giá thất bại!", "Đóng", {
          duration: 3000,
        });
      }
    });
  }
  buyAgain(productId: number) {
    this.router.navigate(['/customer/product-details', productId]);
  }
}