import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddEmployeePage } from './add-employee/add-employee.page';
import { UserService } from './user.service';
import { File } from '@ionic-native/File/ngx';

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
})
export class UserPage implements OnInit {

  employeeList: any = [];
  photos: any = [];

  constructor(private modalCtrl: ModalController, private userService: UserService,
    private route: Router, private file: File) { }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: AddEmployeePage,
    })
    await modal.present();
    modal.onDidDismiss().then(data => {
      this.getEmployeeList();
    })
  }

  getEmployeeList() {
    this.userService.getEmployeeList().subscribe(data => {
      // console.log(data);
      this.employeeList = data;
      this.base64();
    })
  }

  base64() {
    this.employeeList.forEach((element) => {
      let image = element.image;
      let filename = image.substring(image.lastIndexOf('/') + 1);
      let path = image.substring(0, image.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, filename).then((base64) => {
        element.image = base64;
      })
    });

  }

  navigateToDetail(id) {
    this.route.navigate(['/user/employee-detail/' + id]);
  }

  ngOnInit() {
    this.getEmployeeList();
  }

}
