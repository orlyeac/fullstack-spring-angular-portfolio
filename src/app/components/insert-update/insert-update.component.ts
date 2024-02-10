import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-insert-update',
  templateUrl: './insert-update.component.html',
  styleUrls: ['./insert-update.component.scss']
})
export class InsertUpdateComponent {
  date: string = new Date().getFullYear().toString();
  options: string[] = [
    'MALE',
    'FEMALE'
  ];
  gender: string | undefined;

  modify(): void {
    this.date = new Date(this.date).getFullYear().toString();
  }
}
