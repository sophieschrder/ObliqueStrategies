import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Card} from "../../cards";


@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage {

  cards: Array<Card>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cards = navParams.get('cards');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidesPage');
  }

}
