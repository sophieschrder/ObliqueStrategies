import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Card} from "../../cards";
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {Storage} from "@ionic/storage";
import {BadgePage} from "../badge/badge";


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public myCardsService: CardServiceProvider,
              private toastCtrl: ToastController,
              private storage: Storage, private modalCtrl: ModalController) {
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
    this.presentToast();

    this.storage.get('history').then((historie) => {
      this.cardHistory = JSON.parse(historie) || [];
      this.totalCardsPlayed= this.cardHistory.length;
      console.log(this.totalCardsPlayed);
      if(this.totalCardsPlayed === 5 || this.totalCardsPlayed === 10 || this.totalCardsPlayed === 15
        || this.totalCardsPlayed === 20 ||this.totalCardsPlayed === 25 || this.totalCardsPlayed === 30 ){
        //this.navCtrl.push(Badge1Page,{cardsPlayed:this.totalCardsPlayed} );
        this.presentModal();
      }
      this.cardHistory.push(this.card.id);
      return this.storage.set('history', JSON.stringify(this.cardHistory));
    });
  }

  presentModal() {
    let badgeModal = this.modalCtrl.create(BadgePage, { cardsPlayed:this.totalCardsPlayed });
    badgeModal.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Viel Spaß mit der ausgewählten Karte!',
      duration: 3000,
      position: 'middle',
      cssClass: 'myToast'
    });

    toast.present();
  }
}
