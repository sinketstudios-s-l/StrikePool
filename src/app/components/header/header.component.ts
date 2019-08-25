import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  user: string = ""
  picture:string=""

  constructor(private menuCtrl: MenuController, private userSvc: UserService, private afs: AngularFirestore) { 

    this.mainuser = afs.doc(`users/${userSvc.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.user = event.username
      this.picture = event.picture
    })

  }



  ngOnInit() {}

  openMenu(){
    this.menuCtrl.enable(true, 'main');
    this.menuCtrl.open('main')
  }

  userMenu(){
    this.menuCtrl.enable(true, 'userMenu');
    this.menuCtrl.open('userMenu')
  }


}
