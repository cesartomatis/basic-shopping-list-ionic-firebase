import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Item } from '../../models/item/item.model';
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
    private svShoppingList: ShoppingListService
  ) {}

  ionViewWillLoad() {
    this.shoppingList$ = this.svShoppingList
      .getShoppingList() // returns de DB List
      .snapshotChanges() // returns the key value pairs
      .map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      );
  }
}
