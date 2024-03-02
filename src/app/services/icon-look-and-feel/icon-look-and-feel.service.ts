import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconLookAndFeelService {

  constructor() { }

  iconLookAndFeel(initial: string): string {
    let hash: number = 0;
    for (let i: number = 0 ; i < initial.length ; i++) {
      hash += initial.charCodeAt(i) + ((hash << 5) + hash);
    }
    let look: string = '#';
    for (let i: number = 0 ; i < 3 ; i++) {
      let hashItem: number = (hash >> (i * 8)) & 0xff;
      look += hashItem.toString(16).padStart(2, '0');
    }
    return look;
  }
}
