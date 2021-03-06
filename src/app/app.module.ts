import { LocalNotifications } from "@ionic-native/local-notifications";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule} from "@ionic/storage";

import { StartPage } from '../pages/start/start';
import {SlidesPage} from "../pages/slides/slides";
import {HistoriePage} from "../pages/historie/historie";
import {SettingsPage} from "../pages/settings/settings";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StoebernPage} from "../pages/stoebern/stoebern";
import {AboutPage} from "../pages/about/about";
import { CardServiceProvider } from '../providers/card-service/card-service';
import {SpielenPage} from "../pages/spielen/spielen";
import {BadgePage} from "../pages/badge/badge";
import {SuggestionsPage} from "../pages/suggestions/suggestions";
import { DatenschutzPage} from "../pages/datenschutz/datenschutz";
import {HttpClientModule} from "@angular/common/http";
import { RestProvider } from '../providers/rest/rest';


@NgModule({
  declarations: [
    MyApp,
    StartPage,
    SlidesPage,
    HistoriePage,
    StoebernPage,
    AboutPage,
    SpielenPage,
    SettingsPage,
    BadgePage,
    SuggestionsPage,
    DatenschutzPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HistoriePage,
    StoebernPage,
    SlidesPage,
    AboutPage,
    SpielenPage,
    SettingsPage,
    BadgePage,
    SuggestionsPage,
    DatenschutzPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CardServiceProvider,
    LocalNotifications,
    RestProvider,
  ]
})
export class AppModule {}
