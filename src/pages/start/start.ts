import { Component } from '@angular/core';
import  { KarteZiehenPage } from "../karte-ziehen/karte-ziehen";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController) {
  }

  goAnOtherPage() {
    this.navCtrl.setRoot(KarteZiehenPage);
  }
}
