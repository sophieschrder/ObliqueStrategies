import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StartPage } from '../pages/start/start';
import { HistoriePage} from "../pages/historie/historie";
import { SettingsPage} from "../pages/settings/settings";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StoebernPage} from "../pages/stoebern/stoebern";
import {AboutPage} from "../pages/about/about";
import {SpielenPage} from "../pages/spielen/spielen";
import {Storage} from "@ionic/storage";




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{ title: string, component: any, icon: string}>;


  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Startseite', component: StartPage, icon: 'flag' },
      {title: 'Spielen', component: SpielenPage, icon: 'game-controller-a'},
      {title: 'Stöbern', component: StoebernPage, icon: 'eye'},
      {title: 'Meine Spielhistorie', component: HistoriePage, icon: 'paper'},
      {title: 'Einstellungen', component: SettingsPage, icon: 'ios-settings'},
      {title: 'About', component: AboutPage, icon: 'paper-plane'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setRootPage();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  //Move rootpage to history if app has been played once
  setRootPage() {
    this.storage.get("history").then((history) => {
      if (history) {
        this.rootPage = HistoriePage;
      } else {
        this.rootPage = StartPage;
      }
    });
  }
}
