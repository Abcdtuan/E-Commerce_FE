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

  existingImg: string  | null = null;



  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { 
    this.productId = this.activatedRoute.snapshot.params['productId'];
  }

  ngOnInit(): void {
    this.productDetails();
  }

  productDetails(){
    this.customerService.getProductById(this.productId).subscribe(res=>{
      console.log(res);
      this.existingImg = 'data:image/jpeg;base64,' + res.byteImg;
      this.product = res;
    })
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

}
