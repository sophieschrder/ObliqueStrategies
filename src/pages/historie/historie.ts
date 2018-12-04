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

  /** speichert alle IDs defr Cards in der Historie */
  ids: number[];
  
  /** speichert eine Referenz auf alle Cards */
  cards: Array<Card>;
  
  /** die Cards aus der ID Liste */
  cardHistory: Array<Card> = new Array<Card>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider, private storage: Storage) {
    this.cards = this.myCardsService.getCards();
  }

  /**
   * wird aufgerufen, wenn diese Seite dargestellt werden soll.
   */
  ionViewDidLoad() {
    // laden der Historie als JSON string (wird in data gespeichert)
    this.storage.get('history').then( ( data ) => {
      // aus der JSON historie ein ARRAY von OBJECTS machen
      this.ids = JSON.parse( data )
        // erzeuge cardHIstory für jede ID in ids
        for (let i = 0; i < this.ids.length; i++) {
          // id aus IDs holen
          const id: number = Number(this.ids[i]);
          // aus cards die karte mit ID=id suchen
          for (let c = 0; c < this.cards.length; c++) {
            const card: Card = this.cards[c];
            if (card.id == id) {
              // karte gefunden, in history kopieren
              this.cardHistory.push(card);
              // aufhören
              //break;
            }
          }
        }

    }); 
    console.log('ionViewDidLoad HistoriePage');
  }

  public async showHistory(){
    this.history= await this.storage.get('history');
    console.log(this.history);
  }

  public clearHistory(){
    this.storage.clear().then(() => {console.log('Historie entfernt')});
  }

}
