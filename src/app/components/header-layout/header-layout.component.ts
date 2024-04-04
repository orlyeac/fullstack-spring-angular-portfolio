import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CustomerResponse } from 'src/app/models/customer-response';
import { IconLookAndFeelService } from 'src/app/services/icon-look-and-feel/icon-look-and-feel.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent {
  @Input()
  user_logged: CustomerResponse | undefined;

  @Output()
  emitterLogout: EventEmitter<void> = new EventEmitter<void>();

  menu: MenuItem[] = [
    {label: 'Profile', icon: 'pi pi-user'},
    {separator: true},
    {label: 'Logout', icon: 'pi pi-sign-out', command: () => {
      this.emitterLogout.emit();
    }}
  ];

  @Output()
  emitterMenuDisplay: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private iconLookAndFeelService: IconLookAndFeelService) {

  }

  iconLookAndFeel(username: string | undefined): string {
    if (username == undefined) {
      username = 'unknown'
    }
    return this.iconLookAndFeelService.iconLookAndFeel(username);
  }

  emitMenuDisplay(fullMenu: boolean): void {
    this.emitterMenuDisplay.emit(fullMenu);
  }
}
