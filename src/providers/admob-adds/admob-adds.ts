import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AdMobFree,
  AdMobFreeInterstitialConfig,
  AdMobFreeBannerConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free';

/*
  Generated class for the AdmobAddsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdmobAddsProvider {
  constructor(private admob: AdMobFree) {}

  async showBannerAds() {
    try {
      const bannerConfig: AdMobFreeBannerConfig = {
        isTesting: true,
        autoShow: true
      };

      this.admob.banner.config(bannerConfig);

      const result = await this.admob.banner.prepare();
      console.log(result);
    } catch (err) {
      console.log(JSON.stringify(err, undefined, 2));
    }
  }

  removeBannerAds() {
    this.admob.banner.remove();
  }

  async showInterstitialAds() {
    try {
      const interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: true,
        autoShow: true
      };

      this.admob.interstitial.config(interstitialConfig);

      const result = await this.admob.interstitial.prepare();
      console.log(result);
    } catch (err) {
      console.log(JSON.stringify(err, undefined, 2));
    }
  }

  async showRewardVideoAds() {
    try {
      const rewardVideoConfig: AdMobFreeRewardVideoConfig = {
        autoShow: true,
        isTesting: true
      };

      this.admob.rewardVideo.config(rewardVideoConfig);

      const result = await this.admob.rewardVideo.prepare();
      console.log(result);
    } catch (err) {
      console.log(JSON.stringify(err, undefined, 2));
    }
  }
}
