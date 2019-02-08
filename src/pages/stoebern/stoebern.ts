import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Card} from "../../cards";
import {SlidesPage} from "../slides/slides";
import {CardServiceProvider} from "../../providers/card-service/card-service";


@IonicPage()
@Component({
  selector: 'page-stoebern',
  templateUrl: 'stoebern.html',
})
export class StoebernPage {

  cards: Array<Card>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider) {
  this.cards = this.myCardsService.getCards();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoebernPage');
  }

  pushPage(selection){
    // push another page onto the navigation stack
    // causing the nav controller to transition
    // to the new page
    // optional data can also be passed to the pushed page.
      this.navCtrl.push(SlidesPage,{
      cards: this.cards.filter(card => card.category == selection)});
    }

  showAll(){
    this.navCtrl.push(SlidesPage, {cards: this.cards});
  }

}
