import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CartComponent } from './components/Cart/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';



const routes: Routes = [
  {path: 'dashboard', component: CustomerDashboardComponent},
  {path: 'cart', component:CartComponent},
  {path: 'product-details/:productId', component: ProductDetailComponent},
  {path: 'payment-return', component: PaymentComponent},
  {path: 'orders', component: OrdersComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
