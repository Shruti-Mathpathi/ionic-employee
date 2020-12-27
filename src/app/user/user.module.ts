import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPage } from './user.page';
import { UserPageRoutingModule } from './user-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
