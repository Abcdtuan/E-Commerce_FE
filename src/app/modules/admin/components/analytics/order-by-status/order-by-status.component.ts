import { Component, Input } from '@angular/core';
import { MatCardModule, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-order-by-status',
  standalone: true,
  imports: [MatCardModule, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardContent],
  templateUrl: './order-by-status.component.html',
  styleUrl: './order-by-status.component.scss'
})
export class OrderByStatusComponent {
  @Input() data: any;

}
