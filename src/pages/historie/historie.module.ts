import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HistoriePage} from './historie';

@NgModule({
  declarations: [
    HistoriePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoriePage),
  ],
})
export class HistoriePageModule {
}
