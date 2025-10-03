import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatOption, CommonModule, ReactiveFormsModule, MatIcon],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
   productForm!: FormGroup
  
    listOfCategories: any = [];
  
    selectedFile: File | null = null;
  
    imagePreview: string | ArrayBuffer | null = null;

    productId!: number;

    existingImg: string  | null = null;

    
  
    constructor(private fb: FormBuilder,
      private adminService: AdminService,
      private route: Router,
      private snackbar: MatSnackBar,
      private activatedRoute: ActivatedRoute) {
         this.productId = Number(this.activatedRoute.snapshot.params['productId']);
      }
    
  
    onFileSelected(event: any){
      this.selectedFile = event.target.files[0];
      this.previewImage();
      this.existingImg = null;
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
       this.getProductById();
    }
    getAllCategorys(){
      this.adminService.getAllCategorys().subscribe({
        next: (res) => {
          this.listOfCategories = res;
        },
      })
    }
    getProductById(){
      this.adminService.getProductById(this.productId).subscribe({
       next: (res) =>{
          this.productForm.patchValue(res)
          this.existingImg = 'data:image/jpeg;base64,' + res.byteImg;
       }
       
      })
    }
    updateProduct(): void{
      if(this.productForm.valid){
        const formData = new FormData();
        if (this.selectedFile) {
          formData.append('img', this.selectedFile);
        }
        formData.append('name', this.productForm.get('name')?.value);
        formData.append('description', this.productForm.get('description')?.value);
        formData.append('price', this.productForm.get('price')?.value);
        formData.append('categoryId', this.productForm.get('categoryId')?.value);

        this.adminService.updateProduct(this.productId,formData).subscribe({
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
       

