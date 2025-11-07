import { ProductDetailComponent } from './../customer/components/product-detail/product-detail.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostCouponComponent } from './components/post-coupon/post-coupon.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { OrderComponent } from './components/order/order.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { UsersComponent } from './components/users/users.component';
import { AnalyticsProductsComponent } from './components/analytics-products/analytics-products.component';
import { ProuctDetailComponent } from './components/prouct-detail/prouct-detail.component';

const routes: Routes = [
  {path:'dashboard',component: AdminDashboardComponent},
  {path:'product', component: PostProductComponent},
  {path:'category',component: PostCategoryComponent},
  {path:'post-coupon', component: PostCouponComponent},
  {path: 'coupons', component: CouponsComponent},
  {path:'update-product/:productId', component: UpdateProductComponent},
  {path:'orders',component: OrderComponent},
  {path:'analytics', component: AnalyticsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'analytics-products', component: AnalyticsProductsComponent},
  {path:'product-detail/:productId', component: ProuctDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  
}
