import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  @Input()
  isDisplayedMenu: boolean = false;
  menu: MenuItem[] | undefined;
  minimizedMenu: MenuItem[] | undefined;

  ngOnInit(): void {
    this.menu = [
      {label: 'Home', icon: 'pi pi-home'},
      {label: 'Customers', icon: 'pi pi-users'},
      {label: 'Settings', icon: 'pi pi-cog'}
    ];
    this.minimizedMenu = this.menu.map((i) => {
      let k: MenuItem = {label: '', icon: i.icon};
      return k;
    });
  }
}
