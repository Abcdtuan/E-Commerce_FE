import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostCouponComponent } from './components/post-coupon/post-coupon.component';
import { CouponsComponent } from './components/coupons/coupons.component';

const routes: Routes = [
  {path:'dashboard',component: AdminDashboardComponent},
  {path:'product', component: PostProductComponent},
  {path:'categoty',component: PostCategoryComponent},
  {path:'post-coupon', component: PostCouponComponent},
  {path: 'coupons', component: CouponsComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  
}
