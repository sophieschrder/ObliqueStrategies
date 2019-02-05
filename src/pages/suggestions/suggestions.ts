import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {DatenschutzPage} from "../datenschutz/datenschutz";
import { RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html',
})

export class SuggestionsPage {
  suggestionForm: FormGroup;
  //myUrl = "https://hooks.slack.com/services/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";
  myUrl = "http://localhost:8100/api/slack/services/TD6RU4X0U/BFY6X1MCL/ZlzJDbXeI7SjSjuRLd4DDwZK"

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,
              private toastCtrl: ToastController, public restProvider: RestProvider, private http: HttpClient) {
    this.suggestionForm = this.fb.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
      email: ['', Validators.email],
      contactAllowed: [],
      readDatenschutz: [],
    });

  }

  submitForm() {
    console.log(this.suggestionForm.value);
    //this.sendSuggestion(this.suggestionForm.value);
    this.sendSlackMessage(this.suggestionForm);
    this.presentToast();
    this.suggestionForm.reset();
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: `Danke für deinen Kartenvorschlag:  ${this.suggestionForm.controls.text.value}. 
                Vielleicht ist die neue Karte schon beim nächsten Update mit dabei!`,
      duration: 5000,
      position: 'middle',
      //cssClass: 'myToast'
    });

    toast.present();
  }

  showDatenschutz() {
    if (this.suggestionForm.get('readDatenschutz').value === true) {
      this.navCtrl.push(DatenschutzPage);
    }
  }

  sendSuggestion(content) {
    this.restProvider.sendSuggestion(content).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  sendSlackMessage(suggestionForm) {
    var messageText = suggestionForm.controls.text.value;
    console.log(JSON.stringify(messageText));
    let data= { "text": messageText }
    console.log(data);
    return this.http.post(this.myUrl, data)
      .subscribe();
  }
}
