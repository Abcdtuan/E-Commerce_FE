import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CustomerDashboardComponent } from '../modules/customer/components/customer-dashboard/customer-dashboard.component';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignupComponent},
  {path: 'trackOrder',component: TrackOrderComponent},
  {path:'', component: CustomerDashboardComponent},
  {path:'forgot-password', component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
