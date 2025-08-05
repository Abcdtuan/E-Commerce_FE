import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, CommonModule, MatFormFieldModule, MatLabel,MatInputModule, MatError, MatOption, MatSelectModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

  productForm!: FormGroup

  listOfCategories: any = [];

  selectedFile: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private route: Router,
    private snackbar: MatSnackBar) {}
  

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  
  previewImage(){
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null,[Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]]
    })
    this.getAllCategorys();
  }
  getAllCategorys(){
    this.adminService.getAllCategorys().subscribe({
      next: (res) => {
        this.listOfCategories = res;
      },
    })
  }

  addProduct(): void{
    if(this.productForm.valid){
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);

      this.adminService.addProduct(formData).subscribe({
        next: (res) => {
          if(res.id !== null){
            this.snackbar.open("Product Added Successfully", "Close", {
              duration: 3000,
            });
            this.route.navigate(['/admin/dashboard']);
          }
        }
      });
    }else{
      for (const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
