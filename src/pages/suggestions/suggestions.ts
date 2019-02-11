import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html',
})

export class SuggestionsPage {
  suggestionForm: FormGroup;
  myUrl = "https://hooks.slack.com/services/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";

  /*
  // to test from the web, you need to use this url:
  myUrl = "http://localhost:8100/api/slack/services/TD6RU4X0U/BFY6X1MCL/ZlzJDbXeI7SjSjuRLd4DDwZK"
  // and insert this code for a proxy in ionic.config.json
  "proxies": [
    {
      "path": "/api/slack/services",
      "proxyUrl": "https://hooks.slack.com/services"
    }
    ]*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,
              private toastCtrl: ToastController, public restProvider: RestProvider, private http: HttpClient) {
    this.suggestionForm = this.fb.group({
      name: ['', Validators.required],
      suggestion: ['', Validators.required],
    });

  }

  submitForm() {
    //this.sendSuggestion(this.suggestionForm.value);
    this.sendSlackMessage(this.suggestionForm);
    this.presentToast();
    this.suggestionForm.reset();
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: `Danke für deinen Kartenvorschlag:  ${this.suggestionForm.controls.suggestion.value}. 
                Vielleicht ist die neue Karte schon beim nächsten Update mit dabei!`,
      duration: 5000,
      position: 'middle',
      cssClass: 'myBigToast'
    });
    toast.present();
  }



  sendSuggestion(content) {
    this.restProvider.sendSuggestion(content).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  sendSlackMessage(suggestionForm) {
    let suggestion: string = this.suggestionForm.controls.suggestion.value;
    let name: string= this.suggestionForm.controls.name.value;
    let messageText=`${name} hat einen neuen Kartenvorschlag: ${suggestion}.`
    let data= JSON.stringify({ text: messageText });
    console.log(data);
    return this.http.post(this.myUrl, data,{responseType:'text'})
      .subscribe();
  }
}
