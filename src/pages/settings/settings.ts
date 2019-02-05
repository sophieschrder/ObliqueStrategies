import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, AlertController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { LocalNotifications } from "@ionic-native/local-notifications";
import {BadgePage} from "../badge/badge";
import {HistoriePage} from "../historie/historie";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  history: number[];
  totalCardsPlayed: number;
  cardHistory: number[];
  reminderOn: boolean;

  data = { title:'', description:'', date:'', time:'' };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public localNotifications: LocalNotifications,
              public platform: Platform,
              public alertCtrl: AlertController,
              private modalCtrl: ModalController) {
  }

  setDailyReminder(){
    this.platform.ready().then(() => {
      if (this.reminderOn){
      let hours= new Date().getHours();
      let minutes = new Date().getMinutes();
      this.localNotifications.schedule({
        title: 'Quriosity',
        text: 'Heute schon eine Quriosity Karte gespielt?',
        //trigger: {at: new Date(new Date().getTime() + 3600) },//Hier kann Auslösung zu einem bestimmten Zeitpunkt erfolgen
        trigger: {every: { hour: hours, minute: minutes +1 } },// Jeden Tag um die gleiche Uhrzeit
        icon: "ic_notifications",
        led: 'FF0000',
        sound: this.setSound(),
      });
      let alert = this.alertCtrl.create({
        title: 'Danke!',
        subTitle: 'Du bekommst ab jetzt eine tägliche Erinnerung von Quriosity',
        buttons: ['OK']
      });
      alert.present();
      }
      else {
        this.localNotifications.cancelAll();
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Tägliche Erinnerung von Quriosity ist ausgeschaltet.',
          buttons: ['OK']
        });
        alert.present();
      }
    });

  }
/*

  setNotification(){
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();

    let time1 = new Date(year, month, day, 17, 31, 0, 0);
    let time2 = new Date(year, month, day, 17, 32, 0, 0);

    this.localNotifications.schedule([
      {
        id: 1,
        title: 'My first notification',
        text: 'First notification test one',
        trigger: {firstAt: new Date(time1)},
        data: {"id": 1, "name": "Mr. A"}
      },
      {
        id: 2,
        title: 'My Second notification',
        text: 'Second notification on 12 pm',
        trigger: {firstAt: new Date(time2)},
        data: {"id": 2, "name": "Mr. B"}
      }
    ]);}
*/


  //Funktion zum Einstellen der Sounddatei für die jeweilige Plattform
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }

  //History löschen

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  public async showHistory(){
    this.history= await this.storage.get('history');
    console.log(this.history);
  }
  public async showBadges(){
    this.storage.get('history').then((historie) => {
      this.cardHistory = JSON.parse(historie) || [];
      this.totalCardsPlayed = this.cardHistory.length;
      console.log(this.totalCardsPlayed);
      this.presentModal()
    })
  }

  presentModal() {
    let badgeModal = this.modalCtrl.create(BadgePage, { cardsPlayed:this.totalCardsPlayed, page: "meinProfilPage" });
    badgeModal.present();
  }

  showPlayedCards(){
    this.navCtrl.setRoot(HistoriePage);
  }
  public clearHistory(){
    this.storage.clear().then(() => {console.log('Historie entfernt')});
  }
}
