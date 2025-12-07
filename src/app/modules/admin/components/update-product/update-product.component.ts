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
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { switchMap, tap, map } from 'rxjs/operators';
import { MatLabel } from '@angular/material/form-field';



@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatOption, CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatLabel],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
   productForm!: FormGroup
  
    listOfCategories: any = [];
  
    selectedFiles: File[] = [];
  
    imagePreview: (string | ArrayBuffer)[] = [];

    productId!: number;

    existingImg: string []  | null = null;

    brandForm!: FormGroup;

    listOfBrands: any = [];

    showBrandForm: boolean = false;

    
  
    constructor(private fb: FormBuilder,
      private adminService: AdminService,
      private route: Router,
      private snackbar: MatSnackBar,
      private activatedRoute: ActivatedRoute) {
         this.productId = Number(this.activatedRoute.snapshot.params['productId']);
      }
    
  
    ngOnInit(): void {
      this.productForm = this.fb.group({
        categoryId: [null, [Validators.required]],
        name: [null,[Validators.required]],
        description: [null, [Validators.required]],
        price: [null, [Validators.required, Validators.min(0)]],
        origin:[null, [Validators.required]],
        brandId: [null, [Validators.required]],
        stockQuantity: [0, [Validators.required, Validators.min(0)]]

      })
      this.brandForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]]
      });
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
    getProductById() {
      this.adminService.getProductById(this.productId).pipe(
        switchMap(res => {
          this.existingImg = res.byteImages?.map((imgByte: string) =>
            'data:image/jpeg;base64,' + imgByte
          ) || [];
          return this.adminService.getBrandByCategoryId(res.categoryId).pipe(
            tap(brands => this.listOfBrands = brands),
            map(() => res)
          );
        })
      ).subscribe(res => {
        this.productForm.patchValue({
          categoryId: res.categoryId,
          brandId: res.brandId,
          name: res.name,
          description: res.description,
          price: res.price,
          origin: res.origin,
          stockQuantity: res.stockQuantity
        });
      });
    }

    onFileSelected(event: any) {
      this.selectedFiles = Array.from(event.target.files);
      this.imagePreview = [];

      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview.push(reader.result as string | ArrayBuffer);
        };
        reader.readAsDataURL(file);
      });
      this.existingImg = null;
    }
    updateProduct(): void{
      if(this.productForm.valid){
        const formData = new FormData();
        if (this.selectedFiles.length) {
        this.selectedFiles.forEach(file => formData.append('img', file));
        }
        formData.append('name', this.productForm.get('name')?.value);
        formData.append('description', this.productForm.get('description')?.value);
        formData.append('price', this.productForm.get('price')?.value);
        formData.append('categoryId', this.productForm.get('categoryId')?.value);
        formData.append('brandId', this.productForm.get('brandId')?.value);
        formData.append('origin', this.productForm.get('origin')?.value);
        formData.append('stockQuantity', this.productForm.get('stockQuantity')?.value);

        this.adminService.updateProduct(this.productId,formData).subscribe({
          next: (res) => {
            if(res.id !== null){
              this.snackbar.open("Cập nhật thành công", "Close", {
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
    onCategoryChange(categoryId: number): void {
    if (!categoryId) {
      this.listOfBrands = [];
      this.productForm.patchValue({ brandId: null });
      return;
    }
    this.getBrandByCategory(categoryId);
  }

 getBrandByCategory(categoryId: number, callback?: () => void) {
  if (!categoryId) {
    this.listOfBrands = [];
    if (callback) callback();
    return;
  }
  this.adminService.getBrandByCategoryId(categoryId).subscribe(res => {
    this.listOfBrands = res;
    if (callback) callback();
  });
}

  createBrand() {
    const categoryId = this.productForm.get('categoryId')?.value;
    if (!categoryId) {
      this.snackbar.open("Vui lòng chọn danh mục trước khi thêm brand", "Close", { duration: 3000 });
      return;
    }

    if (this.brandForm.valid) {
      const payload = { ...this.brandForm.value, categoryId };
      this.adminService.createBrand(payload).subscribe(res => {
        if (res != null) {
          this.snackbar.open("Tạo brand thành công", "Close", { duration: 3000 });
          this.getBrandByCategory(categoryId);
          this.showBrandForm = false;
          this.brandForm.reset();
        }
      });
    }
  } 
}
       

