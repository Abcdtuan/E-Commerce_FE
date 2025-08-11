import { Component } from '@angular/core';
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
import { CustomerService } from '../../service/customer.service';


@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatDividerModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatChipsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  products: any[] = [];
  searchProducts!: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,
              private customerService: CustomerService) { }
  

  ngOnInit() {
    this.getAllProducts();
    this.searchProducts = this.fb.group({
      title: [null, [Validators.required]]
    })
  }
  getAllProducts() {
    this.products = []
    this.customerService.getAllProducts().subscribe((res: any[]) => {
      res.forEach((element: any) =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
      console.log(this.products);
    })
  }
  submitSearch(){
    this.products = [];
    const title = this.searchProducts.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe((res: any[]) => {
      res.forEach((element: any) =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
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
