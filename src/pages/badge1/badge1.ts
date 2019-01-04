import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-badge1',
  templateUrl: 'badge1.html',
})
export class Badge1Page {

  cardNumber: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cardNumber = navParams.get('cardsPlayed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Badge1Page');
  }

}
