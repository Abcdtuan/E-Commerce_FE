import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';

const routes: Routes = [
  {path:'dashboard',component: AdminDashboardComponent},
  {path:'product', component: PostProductComponent},
  {path:'categoty',component: PostCategoryComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  
}
