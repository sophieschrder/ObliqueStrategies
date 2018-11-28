import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Card} from "../../cards";
import {CardServiceProvider} from "../../providers/card-service/card-service";

/**
 * Generated class for the KarteZiehenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-karte-ziehen',
  templateUrl: 'karte-ziehen.html',
})
export class KarteZiehenPage {

  cards: Array<Card>;
  card: Card;

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider) {
    this.cards=  this.myCardsService.getCards()
    let i= Math.floor(Math.random()*this.cards.length);
    this.card = this.cards[i];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KarteZiehenPage');
  }

}
