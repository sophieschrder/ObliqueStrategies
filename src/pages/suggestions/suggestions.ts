import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {BadgePage} from "../badge/badge";
import {DatenschutzPage} from "../datenschutz/datenschutz";
import {SlidesPage} from "../slides/slides";

@IonicPage()
@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html',
})

export class SuggestionsPage {
  suggestion: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb:FormBuilder,
              private toastCtrl: ToastController, private modalCtrl: ModalController) {
      this.suggestion = this.fb.group({
        name: ['', Validators.required],
        suggestion: ['', Validators.required],
        email: ['', Validators.email],
        contactAllowed:[],
        readDatenschutz: [],
      });
    }

    submitForm(){
      this.presentToast();
      console.log(this.suggestion.value);
    }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Danke für den Kartenvorschlag!',
      duration: 3000,
      position: 'middle',
      cssClass: 'myToast'
    });

    toast.present();
  }

  showDatenschutz(){
    if(this.suggestion.get('readDatenschutz').value === true){
      this.navCtrl.push(DatenschutzPage);
    }
  }

}
