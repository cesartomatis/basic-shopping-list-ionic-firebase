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
  notDoneList: Array<Item> = new Array<Item>();
  doneList: Array<Item> = new Array<Item>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private svShoppingList: ShoppingListService,
    private svToast: ToastService
  ) {}

  ionViewDidLoad() {
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

    this.notDoneList = new Array<Item>();
    this.doneList = new Array<Item>();
    this.shoppingList$.subscribe((items: Array<Item>) =>
      items.map(item => {
        if (!item.done) {
          this.notDoneList.push(item);
        } else {
          this.doneList.push(item);
        }
      })
    );
  }

  async onDone(item: Item) {
    item.done = true;
    await this.svShoppingList.editItem(item);
    // this.refreshList();
    this.navCtrl.setRoot('HomePage');
    // this.notDoneList.push(item);
    // let index = this.doneList.findIndex(i => i.key === item.key);
    // this.doneList.slice(index, 1);
  }

  async onUndone(item: Item) {
    item.done = false;
    await this.svShoppingList.editItem(item);
    // this.refreshList();
    this.navCtrl.setRoot('HomePage');
    // this.doneList.push(item);
    // let index = this.notDoneList.findIndex(i => i.key === item.key);
    // this.notDoneList.slice(index, 1);
  }

  async onDelete(item) {
    await this.svShoppingList.deleteItem(item);
    this.svToast.show(`${item.name} has been removed!`);
  }
}
