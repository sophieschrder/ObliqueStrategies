import { Injectable } from '@angular/core';
import {CARDS} from "../../assets/mock-cards";
import {Card} from "../../cards";

@Injectable()
export class CardServiceProvider {

  constructor() {
    console.log('Hello CardServiceProvider Provider');
  }

  getCards(): Array<Card> {
    return CARDS;
  }

}
