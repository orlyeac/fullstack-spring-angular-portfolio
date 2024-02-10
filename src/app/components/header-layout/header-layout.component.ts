import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent {
  username: string = 'janedoe@email.com';

  menu: MenuItem[] = [
    {label: 'Profile', icon: 'pi pi-user'},
    {label: 'Settings', icon: 'pi pi-cog'},
    {separator: true},
    {label: 'Logout', icon: 'pi pi-sign-out'}
  ];

  @Output()
  emitterMenuDisplay: EventEmitter<boolean> = new EventEmitter<boolean>();

  iconLookAndFeel(username: string): { 'background-color': string, color: string } {
    let hash: number = 0;
    for (let i: number = 0 ; i < username.length ; i++) {
      hash += username.charCodeAt(i) + ((hash << 5) + hash);
    }
    let look: string = '#';
    for (let i: number = 0 ; i < 3 ; i++) {
      let hashItem: number = (hash >> (i * 8)) & 0xff;
      look += hashItem.toString(16).padStart(2, '0');
    }
    return {
      'background-color': look,
      'color': '#ffffff'
    };
  }

  emitMenuDisplay(fullMenu: boolean): void {
    this.emitterMenuDisplay.emit(fullMenu);
  }
}
