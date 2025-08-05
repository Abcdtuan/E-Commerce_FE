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
  constructor(private adminService: AdminService, 
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar
   ) { }

  ngOnInit(){
    this.getAllProducts();
    this.searchProducts = this.fb.group({  
      title: [null,[Validators.required]],
    });

  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe((res: any[]) =>{
      res.forEach((element: any) =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      
    })
  }

  submitSearch() {
    this.products = [];
    const title = this.searchProducts.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe((res: any[]) =>{
      res.forEach((element: any) =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products)
      
    })
  }
  deleteProduct(id: number){
    this.adminService.deleteProduct(id).subscribe({
      next: (res) =>{
        this.matSnackBar.open("Product Deleted Successfully", "Close", {
          duration: 3000,
        })
        this.getAllProducts();
      },
    error: (err) =>{
      this.matSnackBar.open("Error Deleting Product", "Close", {
          duration: 3000,
        }
    )}
    })
  }

}
