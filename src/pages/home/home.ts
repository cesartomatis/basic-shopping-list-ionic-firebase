import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Item } from '../../models/item/item.model';
import { ToastService } from '../../services/toast/toast.service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoppingList$: Observable<Array<Item>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private svShoppingList: ShoppingListService,
    private svToast: ToastService
  ) {}

  ionViewWillEnter() {
    this.refreshList();
  }

  refreshList() {
    this.shoppingList$ = new Observable<Array<Item>>();
    this.shoppingList$ = this.svShoppingList
      .getShoppingList() // returns de DB List
      .snapshotChanges() // returns the key value pairs
      .map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      );
  }

  async onDone(item: Item) {
    item.done = true;
    await this.svShoppingList.editItem(item);
  }

  async onUndone(item: Item) {
    item.done = false;
    await this.svShoppingList.editItem(item);
  }

  async onDelete(item) {
    await this.svShoppingList.deleteItem(item);
    this.svToast.show(`${item.name} has been removed!`);
  }
}
