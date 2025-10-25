import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {

  categories: any[] = [];

  categoryForm!: FormGroup;

  showUpdateModal = false; 

  showAddModal = false;

  selectedCategoryId: number | null = null;

  constructor(private adminService: AdminService,
    private fb: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })

    this.getAllCategorys();
  }

  getAllCategorys() {
    this.adminService.getAllCategorys().subscribe(res => {
      this.categories = res;
      console.log(this.categories)
    });
  }
  deleteCategory(id: number) {
    this.adminService.deleteCategory(id).subscribe(() => {
      this.getAllCategorys(); 
    })
  }

  openUpdate(category: any) {
    this.showUpdateModal = true;
    this.selectedCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  close() {
    this.showUpdateModal = false;
    this.showAddModal = false;
    this.categoryForm.reset();
  }
  updateCategory() {
    const update = this.categoryForm.value;
    if (this.selectedCategoryId !== null){
      this.adminService.updateCategory(this.selectedCategoryId, update).subscribe(() => {
      this.getAllCategorys();
      this.close();
    })
    }
  }
openAddModal() {
  this.showAddModal = true;
  this.categoryForm.reset();
}

addCategory() {
  const newCategory = this.categoryForm.value;
  this.adminService.createCategory(newCategory).subscribe(() => {
    this.getAllCategorys();
    this.close();
  });
}



}
