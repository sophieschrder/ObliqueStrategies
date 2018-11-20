import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CARDS} from "../../assets/mock-cards";
import {Card} from "../../cards";
import {SlidesPage} from "../slides/slides";

@IonicPage()
@Component({
  selector: 'page-stoebern',
  templateUrl: 'stoebern.html',
})
export class StoebernPage {

  cards: Array<Card> = CARDS;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
