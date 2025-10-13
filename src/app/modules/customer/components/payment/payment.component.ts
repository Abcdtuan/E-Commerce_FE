import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [DecimalPipe, CommonModule, RouterModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  params: any = {};
  statusMessage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params;

      if (params['vnp_ResponseCode'] === '00') {
        this.statusMessage = ' Thanh toán thành công!';
      } else {
        this.statusMessage = 'Thanh toán thất bại hoặc bị hủy!';
      }
    });
  }

}
