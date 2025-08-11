import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatTableModule ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent {
  
  coupons: any[] = [];

  constructor(
    private adminService: AdminService,
    private snack: MatSnackBar
  ){}

  ngOnInit() {
    this.getAllCoupons();
  }
  
  getAllCoupons(){
    this.adminService.getAllCoupons().subscribe(res =>{
      this.coupons = res;
      this.snack.open("Coupons fetched successfully", "Close", {
        duration: 2000,
      })
    })
  }

}
