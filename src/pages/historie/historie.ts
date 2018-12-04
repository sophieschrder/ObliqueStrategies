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
  history: number[];

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
    // laden der Historie als JSON string (wird mit data ausgelesen)
    this.storage.get('history').then( ( data ) => {
      // aus der JSON historie ein ARRAY von OBJECTS machen
      this.ids = JSON.parse(data);
      if (data == undefined) {
        console.log("data for Cardhistory undefined");
      }else {
        // erzeuge cardHIstory für jede ID in ids
        for (let i = 0; i < this.ids.length; i++) {
          // id aus IDs holen
          const id: number = Number(this.ids[i]);
          // aus cards die karte mit genannter Id suchen
          for (let c = 0; c < this.cards.length; c++) {
            if (this.cards[c].id == id) {
              // karte gefunden, in cardHistory array kopieren
              this.cardHistory.push(this.cards[c]);
            }
          }
        }
      }
    });
  }

  public async showHistory(){
    this.history= await this.storage.get('history');
  }

  public clearHistory(){
    this.storage.clear().then(() => {console.log('Historie entfernt')});
  }

}
