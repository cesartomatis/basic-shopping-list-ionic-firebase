import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AdMobFree,
  AdMobFreeInterstitialConfig
} from '@ionic-native/admob-free';

import { Item } from '../../models/item/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { AdmobAddsProvider } from '../../providers/admob-adds/admob-adds';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html'
})
export class EditShoppingItemPage {
  item: Item;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private svShoppingList: ShoppingListService,
    private svToast: ToastService,
    private admob: AdmobAddsProvider
  ) {}

  ionViewWillLoad() {
    this.item = this.navParams.get('item');
  }

  async onEditItem(item: Item) {
    await this.svShoppingList.editItem(item);
    this.svToast.show(`${item.name} has been saved!`);
    this.navCtrl.setRoot('HomePage');
  }

  ionViewWillLeave() {
    this.admob.showInterstitialAds();
  }
}
