import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FooterComponent, ReactiveFormsModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: any
  updateForm!: FormGroup
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  
  originalName = '';
  originalImage: string | null = null;

  constructor(private customerService: CustomerService,
    private router:Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ){}

  onfilreSelected(event: any){
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }
  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  ngOnInit(){
    this.updateForm = this.fb.group({
      name: [null],
      img: [null]
     })
    this.profile();
  }

  profile(){
    this.customerService.getProfile().subscribe(res =>{
      console.log(res)
      this.user = res
      this.originalName = res.name;
      if (res.byteImg) {
      this.originalImage = 'data:image/jpeg;base64,' + res.byteImg;
     } 
      this.imagePreview = this.originalImage;
      this.updateForm.patchValue({ name: res.name });
    })
  }
  hasChanged(): boolean {
    const formName = this.updateForm.value.name;
    const newImage = this.selectedFile ? this.imagePreview : this.originalImage;
    return formName !== this.originalName || newImage !== this.originalImage;
  }
  updateProfile(): void {
    const formData = new FormData();
    formData.append('name', this.updateForm.value.name);
    formData.append('id', UserStorageService.getUserId().toString()); 
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.customerService.updateProfile(formData).subscribe({
      next: () => {
        this.snackBar.open('Cập nhật thành công', 'Đóng', { duration: 2000 });
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Cập nhật thất bại', 'Đóng', { duration: 2000 });
      }
    });
  }
  changePassword(){
    this.router.navigate(['customer/change-password'])
  }

}
