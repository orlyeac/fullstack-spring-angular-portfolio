import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { CustomersGuard, LoginSignUpGuard } from './services/guard/access-guard.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "customers",
    component: CustomerComponent,
    canActivate: [CustomersGuard]
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [LoginSignUpGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginSignUpGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {scrollPositionRestoration: 'enabled'}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
