
import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any

  constructor(private customerService: CustomerService){}

  ngOnInit(): void{
    this.getCartByUserId();
  }

  getCartByUserId(){
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(res =>{
      this.order = res
      res.cartItems.forEach((element: any) =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element)
      })
      console.log(this.cartItems)
    })
  }

}
