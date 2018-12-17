import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Card} from "../../cards";
import {Storage} from "@ionic/storage";
import {CardServiceProvider} from "../../providers/card-service/card-service";


@IonicPage()
@Component({
  selector: 'page-historie',
  templateUrl: 'historie.html',
})
export class HistoriePage {

  /** alle IDs der bereits gespielten Karten*/
  ids: number[];

  /** alle Karten des Spiels*/
  cards: Array<Card>;

  /** alle bereits gespielten Karten */
  cardHistory: Array<Card> = new Array<Card>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider, private storage: Storage) {
    this.cards = this.myCardsService.getCards();
  }

  /* Hier gibt es einen Abgleich der Ids aus der Historie mit den Karten.
   Bereits gespielte Karten werden der Historie hinzugefügt */
  ionViewDidLoad() {
    this.storage.get('history').then((data) => {
      this.ids = JSON.parse(data);
      if (data == undefined) {
        console.log("data for Cardhistory undefined");
      } else {
        for (let i = 0; i < this.ids.length; i++) {
          for (let c = 0; c < this.cards.length; c++) {
            if (this.cards[c].id == this.ids[i]) {
              this.cardHistory.unshift(this.cards[c]);
            }
          }
        }
      }
    });
  }


}
