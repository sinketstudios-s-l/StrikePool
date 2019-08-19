import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private menuCtrl: MenuController) { }

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
