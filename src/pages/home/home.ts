import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from "firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  arrData = [];
  myInput;
  selected = true;

  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    // This monitors and retrieves any changes in the database.
    this.fdb.list("/myItems").subscribe((_data) => {
      this.arrData = _data;
    });
  }

  // A method to add an item to the database.
  btnAddClicked() {
    this.fdb.list("/myItems").push({
        name: this.myInput,
        done: false
      },
    );
    this.myInput = '';
  }

  deleteItem(i) {
    this.fdb.list("/myItems").remove(this.arrData[i].$key);
  }

  // This method updates the 'done' property of a particular item.
  changeCrossOut(i) {
    this.fdb.object("/myItems/"+this.arrData[i].$key).update({done: this.arrData[i].done});
  }

  deleteAll() {
    this.fdb.list("/myItems").remove();
  }

  // This methods updates all 'done' properties of the items in order to select or deselect all items.
  selection(flag) {
    this.selected = !flag;
    firebase.database().ref('/myItems').once('value', (data)=>{
      data.forEach((rec) => {
        this.fdb.object("/myItems/"+rec.key).update({done: flag});
      })
    });
  }

}
