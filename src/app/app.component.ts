import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { UserStorageService } from './auth/services/storage/user-storage.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CustomerService } from './modules/customer/service/customer.service';
import { FooterComponent } from "./modules/customer/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive, CommonModule, MatIconModule, MatMenuModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceWeb';

  categories: any[] = [];
  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private route: Router, private customerService: CustomerService){
  }
  ngOnInit(){
    this.route.events.subscribe(() => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
    this.getAllCategories();
  }

  getAllCategories(){
    this.customerService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
      }
    });
    
  }
  logOut(){
    UserStorageService.signOut();
    this.route.navigateByUrl('/login');
  }
}
