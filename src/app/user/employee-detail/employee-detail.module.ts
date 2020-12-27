import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EmployeeDetailPageRoutingModule } from './employee-detail-routing.module';

import { EmployeeDetailPage } from './employee-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeDetailPageRoutingModule,
    LeafletModule
  ],
  declarations: [EmployeeDetailPage]
})
export class EmployeeDetailPageModule {}
