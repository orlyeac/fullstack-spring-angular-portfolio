import { Component, Input } from '@angular/core';
import { CustomerResponse } from 'src/app/models/customer-response';
import { IconLookAndFeelService } from 'src/app/services/icon-look-and-feel/icon-look-and-feel.service';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {

  @Input()
  customer: CustomerResponse | undefined;

  constructor(private iconLookAndFeelService: IconLookAndFeelService) {

  }

  getLabourLink(): string {
    if (this.customer?.labourLink && this.customer.labourLink != 'NONE') {
      let labourLink: string = this.customer.labourLink[0].toUpperCase()
          + this.customer.labourLink.slice(1).toLowerCase()
              .replace('_', ' ');
      return labourLink;
    }
    else {
      return '';
    }
  }

  getConcat(): string {
    if (
        this.customer?.labourLink &&
        this.customer.labourLink != 'NONE' &&
        this.customer.labourLink != 'INTERVIEWER' &&
        this.customer.labourLink != 'RECRUITER'
    ) {
      return ' @ ';
    }
    else {
      return ' from ';
    }
  }

  iconLookAndFeel(username: string | undefined): string {
    if (username == undefined) {
      username = 'unknown'
    }
    return this.iconLookAndFeelService.iconLookAndFeel(username);
  }

  adminPanel(): boolean {
    return this.customer?.authority == 'ROLE_ADMIN' || JSON.parse(localStorage.getItem('id')!).id == this.customer?.id
  }
}
