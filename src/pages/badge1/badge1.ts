import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-badge1',
  templateUrl: 'badge1.html',
})
export class Badge1Page {

  cardNumber: number;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.cardNumber = navParams.get('cardsPlayed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Badge1Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
