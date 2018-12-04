import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Card} from "../../cards";
import {CardServiceProvider} from "../../providers/card-service/card-service";
import { AlertController } from 'ionic-angular';
import {Storage} from "@ionic/storage";

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
  playCounter: number = 0;
  cardHistory: number[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider, public alertCtrl: AlertController,
  private storage: Storage) {
    this.cards=  this.myCardsService.getCards();
    this.getCard();
  }

  ionViewDidLoad() { }

  getCard()
  {
    let i= Math.floor(Math.random()*this.cards.length);
    this.card = this.cards[i];
    this.playCounter += 1;
  }

   async acceptCard(){
     this.showAlert();
     this.storage.get('history').then((historie) => {
       this.cardHistory = JSON.parse(historie) || [];
       this.cardHistory.push(this.card.id);
       return this.storage.set('history', JSON.stringify(this.cardHistory));
     });
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Juuhuuuuu!',
      subTitle: 'Du hast eine Karte ausgewählt! Viel Spaß beim Spielen!',
      buttons: ['OK']
    });
    alert.present();
  }
}
