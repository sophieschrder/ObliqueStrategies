import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Card} from "../../cards";
import { Storage } from "@ionic/storage";
import {CardServiceProvider} from "../../providers/card-service/card-service";

/**
 * Generated class for the HistoriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historie',
  templateUrl: 'historie.html',
})
export class HistoriePage {

  /** speichert alle IDs der gespielten karten in der Historie */
  ids: number[];
  
  /** speichert alle Karten */
  cards: Array<Card>;
  
  /** speichert alle gespielten Karten */
  cardHistory: Array<Card> = new Array<Card>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider, private storage: Storage) {
    this.cards = this.myCardsService.getCards();
  }

  ionViewDidLoad() {
    this.storage.get('history').then( ( data ) => {
      this.ids = JSON.parse(data);
      if (data == undefined) {
        console.log("data for Cardhistory undefined");
      }else {
        for (let i = 0; i < this.ids.length; i++) {
          for (let c = 0; c < this.cards.length; c++) {
            if (this.cards[c].id ==  this.ids[i]) {
              this.cardHistory.unshift(this.cards[c]);
            }
          }
        }
      }
    });
  }


}
