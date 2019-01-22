import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import {HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class RestProvider {
  myUrl = 'https://jsonplaceholder.typicode.com';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  sendSuggestion(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.myUrl+'/posts', JSON.stringify(data)
        //this is how you would set any possibly required parameters
       /* , {
          headers: new HttpHeaders().set('Authorization', 'my-token'),
          params: new HttpParams().set('id', '1'),
        }*/
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
