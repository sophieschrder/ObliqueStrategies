import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StartPage } from '../pages/start/start';
import {SlidesPage} from "../pages/slides/slides";
import {HistoriePage} from "../pages/historie/historie";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StoebernPage} from "../pages/stoebern/stoebern";


@NgModule({
  declarations: [
    MyApp,
    StartPage,
    SlidesPage,
    HistoriePage,
    StoebernPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HistoriePage,
    StoebernPage,
    SlidesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
