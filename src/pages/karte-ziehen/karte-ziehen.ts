import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Card} from "../../cards";
import {SlidesPage} from "../slides/slides";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider) {
    this.cards = this.myCardsService.getCards();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KarteZiehenPage');
  }
  getPage()
  {
    let i= Math.floor(Math.random()*this.cards.length);
    this.navCtrl.push(SlidesPage,{
      cards: this.cards.filter(card => card.id == i)});
  }
}
