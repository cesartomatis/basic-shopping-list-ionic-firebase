import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { AdmobAddsProvider } from '../../providers/admob-adds/admob-adds';

/**
 * Generated class for the AddShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html'
})
export class AddShoppingItemPage {
  item: Item = {
    name: '',
    quantity: undefined,
    done: false
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private svShoppingList: ShoppingListService,
    private svToast: ToastService,
    private admob: AdmobAddsProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }

  ionViewWillEnter() {
    this.admob.showBannerAds();
  }

  async onAddItem(item: Item) {
    let ref = await this.svShoppingList.addItem(item);
    this.svToast.show(`${item.name} added!`);
    this.navCtrl.setRoot('HomePage', { key: ref.key });
  }

  ionViewWillLeave() {
    this.admob.removeBannerAds();
  }
}
