import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrData = [];
  myInput;
  style = 'color=primary'

  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.fdb.list("/myItems").subscribe(_data => {
      this.arrData = _data;
      console.log(this.arrData );
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

  delete(i) {
    this.fdb.list("/myItems").remove(this.arrData[i].$key);
  }

  changeCrossOut(i) {
    if (this.arrData[i].done)
      this.style = 'color=danger';
    else
      this.style = 'color=primary';

    this.fdb.object("/myItems/"+this.arrData[i].$key).update({done: this.arrData[i].done});

  }


}
