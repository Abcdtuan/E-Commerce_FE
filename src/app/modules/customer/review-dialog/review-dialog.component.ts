import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss'
})
export class ReviewDialogComponent {
  reviewForm: FormGroup;
  selectedFiles: File[] = [];
  imagePreviews: (string | ArrayBuffer | null)[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      description: [null, [Validators.required]],
      displayName: [false]
    });
  }

  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
  }

  getRatingText(): string {
    const rating = this.reviewForm.get('rating')?.value;
    const texts = ['', 'Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
    return texts[rating] || '';
  }

  onFileSelected(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.selectedFiles.push(...files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.dialogRef.close({
        formData: this.reviewForm.value,
        files: this.selectedFiles
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}