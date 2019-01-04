import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Card} from "../../cards";
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {AlertController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Badge1Page} from "../badge1/badge1";


@IonicPage()
@Component({
  selector: 'page-spielen',
  templateUrl: 'spielen.html',
})
export class SpielenPage {

  cards: Array<Card>;
  card: Card;
  playCounter: number = 0;
  cardHistory: number[];
  showButtons: boolean = true;
  totalCardsPlayed: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider, public alertCtrl: AlertController,
              private storage: Storage) {
    this.cards = this.myCardsService.getCards();
    this.getCard();
  }

  ionViewDidLoad() {
  }

  //Hier wird eine zufällige Karte gezogen und der Counter pro Aufruf erhöht
  getCard() {
    let i = Math.floor(Math.random() * this.cards.length);
    this.card = this.cards[i];
    this.playCounter += 1;
  }

  //Storage wird ausgelesen und id der selektierten Karte zur history hinzugefügt
  async acceptCard() {
    this.showButtons = false;
    this.showAlert();

    this.storage.get('history').then((historie) => {
      this.cardHistory = JSON.parse(historie) || [];
      this.totalCardsPlayed= this.cardHistory.length;
      console.log(this.totalCardsPlayed);
      if(this.totalCardsPlayed === 2){
        this.navCtrl.push(Badge1Page,{cardsPlayed:this.totalCardsPlayed} );
      }
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
