import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.scss'
})
export class AdvertisementComponent {
  images = [
    
    { src: 'assets/Image3.webp', alt: 'Advertisement 2' },
    { src: 'assets/Image2.webp', alt: 'Advertisement 2' },
    

  ];
  currentIndex = 0;

  constructor() {
    this.startSlideShow();
  }

  startSlideShow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); 
  }

}
