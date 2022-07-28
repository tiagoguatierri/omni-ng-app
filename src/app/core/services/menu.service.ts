import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuItems = new BehaviorSubject<Array<IMenu>>([]);

  public menuItems$ = this.menuItems.asObservable();

  public addMenuItem(item: IMenu): void {
    const items = this.menuItems.getValue();
    items.push(item);
    this.menuItems.next(items);
  }

  public setMenuItems(items: IMenu[]) {
    this.menuItems.next(items);
  }
}
