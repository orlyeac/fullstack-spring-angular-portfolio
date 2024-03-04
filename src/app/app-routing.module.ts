import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { CustomersGuard, LoginGuard } from './services/guard/access-guard.service';

const routes: Routes = [
  {
    path: "customers",
    component: CustomerComponent,
    canActivate: [CustomersGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
