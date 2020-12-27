import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPage } from './user.page';


const routes: Routes = [
  {
    path: '',
    component: UserPage,
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then(m => m.AddEmployeePageModule)
  },
  {
    path: 'employee-detail/:id',
    loadChildren: () => import('./employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
