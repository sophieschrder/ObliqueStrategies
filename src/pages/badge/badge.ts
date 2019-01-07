import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-badge',
  templateUrl: 'badge.html',
})
export class BadgePage {

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
