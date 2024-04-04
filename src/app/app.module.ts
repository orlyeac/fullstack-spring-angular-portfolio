import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { AvatarModule } from 'primeng/avatar';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { InsertUpdateComponent } from './components/insert-update/insert-update.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    MainMenuComponent,
    MenuItemComponent,
    HeaderLayoutComponent,
    InsertUpdateComponent,
    LoginComponent,
    CustomerCardComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AvatarModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    SidebarModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    HttpClientModule,
    MessageModule,
    CardModule,
    BadgeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
