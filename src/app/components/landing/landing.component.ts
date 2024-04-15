import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CustomerResponse } from 'src/app/models/customer-response';
import { IdResponse } from 'src/app/models/id-response';
import { Project } from 'src/app/models/project';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { IconLookAndFeelService } from 'src/app/services/icon-look-and-feel/icon-look-and-feel.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  menu: MenuItem[] | undefined;
  menu_with_identity: MenuItem[] | undefined;
  menu_without_identity: MenuItem[] | undefined;
  mediummenu: MenuItem[] | undefined;
  projects: Project[] | undefined;
  user_logged: CustomerResponse | undefined;
  
  constructor(
    private customerService: CustomerService,
    private iconLookAndFeelService: IconLookAndFeelService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    let idString: string | null = localStorage.getItem('id');
    let customerString: string | null = localStorage.getItem('user_logged');
    if (idString) {
      let idResponse: IdResponse = JSON.parse(idString);
      if(customerString) {
        this.user_logged = JSON.parse(customerString);
      }
      else {
        this.customerService.getCustomer(idResponse.id!)
        .subscribe({
          next: (customer) => {
            this.user_logged = customer;
            localStorage.setItem('user_logged', JSON.stringify(customer));
          },
          error: (e) => {
            if (e.error.statusCode === 401) {
              localStorage.clear();
            }
            else if (e.error.statusCode === 403) {
              localStorage.clear();
            }
            this.user_logged = {
              email: 'Please reload to fetch your user detail'
            }
          }
        });
      }
    }
    
    this.menu = [
      {label: 'Skills', icon: 'pi pi-wrench', routerLink: '/', fragment: 'skills'},
      {label: 'Projects', icon: 'pi pi-code', routerLink: '/', fragment: 'projects'},
      {label: 'Subscribers and reviews', icon: 'pi pi-comments', routerLink: '/', fragment: 'reviews'},
      {label: 'Work Experience', icon: 'pi pi-briefcase', routerLink: '/', fragment: 'experience'},
      {label: 'Blog', icon: 'pi pi-megaphone', routerLink: '/'},
      {separator: true}
    ]

    this.menu_with_identity = [
      {label: '', avatar: true},
      {label: 'Log out', icon: 'pi pi-sign-out', command: () => {
        localStorage.clear();
        this.user_logged = undefined
      }}
    ]
    
    this.menu_without_identity = [
      {label: 'Log in', icon: 'pi pi-sign-in', routerLink: 'login'},
      {label: 'Sign up', icon: 'pi pi-user-plus', routerLink: 'signup'}
    ]

    this.mediummenu = [
      {label: 'Log out', icon: 'pi pi-sign-out', command: () => {
        localStorage.clear();
        this.user_logged = undefined
      }}
    ]

    this.projects = [
      {
        image: 'tuxpoli-api-thumbnail.png',
        name: 'Tuxpoli backend API',
        moto: 'The art of backend in action',
        description: 'A fully fledged microservices architecture system integrating JWT based authentication and authorization as well as user management and microservices communication through message queue',
        skill: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'Docker', 'Mockito', 'Jib', 'Github Actions', 'RabbitMQ'],
        git: 'https://github.com/orlyeac/tuxpoli-backend-api.git',
        link: 'none'
      },
      {
        image: 'tuxpoli-thumbnail-image.png',
        name: 'Tuxpoli Fullstack Portfolio',
        moto: 'The face of a professional',
        description: 'Fullstack Portfolio (the one you are looking now) made with Angular 16. But don\'t think of it merely as a portfolio but as a whole platform integrating user management and reviews and a soon to be design system. That is my vision for it',
        skill: ['Angular 16', 'Typescript', 'HTML', 'css'],
        git: 'https://github.com/orlyeac/tuxpoli-fullstack-portfolio.git',
        link: 'none'
      },
      {
        image: 'iocpoli-thumbnail-image.png',
        name: 'iocpoli',
        moto: 'I just wanted DI everywhere in the world',
        description: 'An Inversion of Control through Dependency Injection in C++ library',
        skill: ['c++'],
        git: 'https://github.com/orlyeac/iocpoli.git',
        link: 'none'
      }    
    ]

    /* responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ]; */
  }
  
  iconLookAndFeel(username: string | undefined): string {
    if (username == undefined) {
      username = 'unknown'
    }
    return this.iconLookAndFeelService.iconLookAndFeel(username);
  }
  
}
