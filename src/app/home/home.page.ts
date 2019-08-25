import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public user: string = ""

  constructor(private menuCtrl: MenuController, 
              private route: Router, 
              private userSvc: UserService,
              private alertCtrl: AlertController) {}

    

    async presentAlert(title: string, content: string){
      const alert = await this.alertCtrl.create({
        header: title,
        message: content,
        buttons: ['Ok']
      })
      await alert.present()
    }


  ngOnInit(){

    this.user = this.userSvc.getUsername()

    
  }

  openTournament(event){
    this.route.navigate(['/torneos'])
  }

 
}
