import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: any

  constructor(private customerService: CustomerService,
    private router:Router
  ){}

  ngOnInit(){
    this.profile();
  }

  profile(){
    this.customerService.getProfile().subscribe(res =>{
      console.log(res)
      this.user = res
    })
  }
  changePassword(){
    this.router.navigate(['customer/change-password'])
  }

}
