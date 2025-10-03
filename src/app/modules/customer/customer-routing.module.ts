import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CartComponent } from './components/Cart/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';



const routes: Routes = [
  {path: 'dashboard', component: CustomerDashboardComponent},
  {path: 'cart', component:CartComponent},
  {path: 'product-details/:productId', component: ProductDetailComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
