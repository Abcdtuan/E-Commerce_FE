import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CartComponent } from './components/Cart/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ReviewComponent } from './review/review.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { ContactComponent } from './components/contact/contact.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';



const routes: Routes = [
  {path: 'dashboard', component: CustomerDashboardComponent},
  {path: 'cart', component:CartComponent},
  {path: 'product-details/:productId', component: ProductDetailComponent},
  {path: 'payment-return', component: PaymentComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'review/:orderId',component: ReviewComponent},
  {path: 'category/:categoryId', component: CategoryProductComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'about', component: IntroduceComponent},
  {path: 'contact', component: ContactComponent },
  {path: 'wishlist', component: WishlistComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
