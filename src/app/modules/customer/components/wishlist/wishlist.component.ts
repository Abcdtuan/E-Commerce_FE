import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  product: any[] = []

  constructor(private customerService: CustomerService, private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getWishlistByUserId();
  }

  getWishlistByUserId(){
    this.customerService.getWishlistByUserId().subscribe(res =>{
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.product.push(element);
      })
      console.log(this.product);
    })

  }
  viewDetail(productId: number) {
    this.router.navigate(['/customer/product-details', productId]);
  }

  addProductToCart(productId: number) {
    this.customerService.addProductToCart(productId).subscribe({
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
  deteleFromWishlist(wishlistId: number){
    this.customerService.deleteWishlistItem(wishlistId).subscribe(res =>{
      this.snackBar.open('Xóa sản phẩm khỏi danh sách yêu thích thành công!', 'Close', {
        duration: 3000,
    })
    this.product = [];
    this.getWishlistByUserId();
    })
  }

}
