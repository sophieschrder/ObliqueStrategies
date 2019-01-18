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

import {timer} from 'rxjs/observable/timer';
import {SuggestionsPage} from "../pages/suggestions/suggestions";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{ title: string, component: any }>;

  showSplash = true;

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
      {title: 'Startseite', component: StartPage},
      {title: 'Spielen', component: SpielenPage},
      {title: 'Stöbern', component: StoebernPage},
      {title: 'Meine Spielhistorie', component: HistoriePage},
      {title: 'Mein Profil', component: SettingsPage},
      {title: 'Karte vorschlagen', component:SuggestionsPage},
      {title: 'About', component: AboutPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setRootPage();

      timer(4000).subscribe(() => this.showSplash = false)
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
