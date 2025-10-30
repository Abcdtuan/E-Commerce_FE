import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: any[] = []

  constructor(private adminService: AdminService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
    this.adminService.getAllUsers().subscribe(res =>{
      console.log(res)
      this.users = res
    })
  }

  toggleStatus(id: number){
    this.adminService.toggleUserStatus(id).subscribe({
      next: (res) => {
        this.getAllUsers();
      }
    })
  }

}
