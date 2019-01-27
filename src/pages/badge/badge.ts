import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-badge',
  templateUrl: 'badge.html',
})
export class BadgePage {

  cardNumber: number;
  parentPage: string;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.cardNumber = navParams.get('cardsPlayed');
    this.parentPage = navParams.get('page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Badge1Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
