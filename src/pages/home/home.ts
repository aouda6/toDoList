import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  arrData = [];
  myInput;

  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.fdb.list("/myItems").subscribe(_data => {
      this.arrData = _data;
    });
  }

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

  changeCrossOut(i) {
    this.fdb.object("/myItems/"+this.arrData[i].$key).update({done: this.arrData[i].done});
  }

  deleteAll() {
    this.fdb.list("/myItems").remove();
  }

  SelectAll() {
    this.fdb.object("/myItems").update();

  }

}
