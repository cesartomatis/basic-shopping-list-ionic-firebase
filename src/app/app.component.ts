import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { AppMinimize } from '@ionic-native/app-minimize';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private headerColor: HeaderColor,
    private appMinimize: AppMinimize,
    private app: App,
    private screenOrientation: ScreenOrientation
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      headerColor.tint('#ffd700');
      statusBar.styleBlackTranslucent();
      this.rootPage = 'HomePage';
      this.nav.setRoot(this.rootPage).then(() => splashScreen.hide());
    });

    platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNavs();
      if (nav[0].canGoBack()) {
        nav[0].pop();
      } else {
        this.appMinimize.minimize();
      }
    });

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}
