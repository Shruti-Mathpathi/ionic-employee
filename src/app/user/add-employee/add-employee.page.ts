import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ModalController } from '@ionic/angular';
import { UserService } from '../user.service';
import { File } from '@ionic-native/File/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  latitude: number;
  longitude: number;
  reverse: any = {};
  form: FormGroup;
  image: any;
  photo: any;
  address: any;
  constructor(private camera: Camera, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    private userService: UserService, private modalCtrl: ModalController, private fb: FormBuilder
    , private file: File) {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      location: ['']
    })
  }

  takePicture() {
    var options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG
    }
    this.camera.getPicture(options).then((image) => {
      this.image = image;
      let filename = image.substring(image.lastIndexOf('/') + 1);
      let path = image.substring(0, image.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, filename).then((base64) => {
        this.photo = base64;
      })
    })
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  currentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.reverseGeocoder();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  
  reverseGeocoder() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        let location = JSON.stringify(result[0]);
        this.reverse = JSON.parse(location);
        this.address = {
          lat: this.latitude,
          lan: this.longitude,
          country: this.reverse.countryName,
          state: this.reverse.administrativeArea,
          city: this.reverse.subLocality + "," + this.reverse.thoroughfare + "," + this.reverse.locality,
          zipcode: this.reverse.postalCode
        }
      })
      .catch((error: any) => {
        alert(error)
      });
  }

  onSubmit(value) {
    const json = {
      name: value.name,
      email: value.email,
      image: this.image,
      phone: value.phone,
      location: this.address
    }
    this.userService.createEmloyee(json).subscribe(data => {
      if(data){
      this.dismiss();
      }
    })
  }

}
