import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  projects: Project[] = [
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

  responsiveOptions = [
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
  ];
}
