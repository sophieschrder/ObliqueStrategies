import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-datenschutz',
  templateUrl: 'datenschutz.html',
})
export class DatenschutzPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBack(){
    this.navCtrl.pop();
  }

}
