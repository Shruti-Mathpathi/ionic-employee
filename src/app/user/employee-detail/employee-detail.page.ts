import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { File } from '@ionic-native/File/ngx';
import { latLng, tileLayer, Icon } from "leaflet";
import * as L from "leaflet";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
})
export class EmployeeDetailPage implements OnInit {
  id: any;
  map: L.Map;
  employeeDetail: any = {};
  city: any;
  state: any;
  country: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private file: File) {
    this.id = this.route.snapshot.paramMap.get("id");
  }


  options = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    zoom: 9,
    center: latLng([15.3173, 75.7139])
  };

  onMapReady(map: L.Map) {
    this.map = map;
    this.getEmployeeDetail();
  }

  ngOnInit() {
  }

  getEmployeeDetail() {
    this.userService.getEmployeeDetail(this.id).subscribe(data => {
      this.employeeDetail = data;
      this.city = this.employeeDetail.location.city;
      this.state = this.employeeDetail.location.state;
      this.country = this.employeeDetail.location.country;
      this.base64();
      this.addMarker();
    })

  }

  addMarker(){
    this.map.setView([this.employeeDetail.location.lat, this.employeeDetail.location.lan], 15);
    L.marker(L.latLng(this.employeeDetail.location.lat, this.employeeDetail.location.lan), {
      draggable: false,
      icon: new Icon({
        iconUrl: "assets/marker-icon.png",
        iconSize: [25, 41],
      })
    }).bindPopup(this.city + "<br>" + this.state).openPopup().addTo(this.map);
  }

  base64(){
    let image = this.employeeDetail.image;
    let filename = image.substring(image.lastIndexOf('/') + 1);
    let path = image.substring(0, image.lastIndexOf('/') + 1);
    this.file.readAsDataURL(path, filename).then((base64) => {
      this.employeeDetail.image = base64;
    })
  }

}
