import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  private user:string= ""

  username:string = ""
  email:string = ""
  passwd:string = ""

  picture: string = "https://firebasestorage.googleapis.com/v0/b/strikepool-terrassa.appspot.com/o/00000000000000000000000000000000.png.jpg?alt=media&token=281bbf98-30d9-4911-b451-081d87eb82b8"

  socio: boolean = false

  mainuser: AngularFirestoreDocument
  sub
  private uid: string
  
  componentsMenu: Componentes [] = [
    {
      icon: 'trophy',
      name: 'Torneos',
      redirectTo: '/torneos'
    },
    {
      icon: 'pin',
      name: 'Hazte Socio',
      redirectTo: '/socios'
    },
    {
      icon: 'people',
      name: 'Servicios',
      redirectTo: '/servicios'
    },
    {
      icon: 'information-circle-outline',
      name: 'Sobre Nosotros',
      redirectTo: '/map'
    }

  ];

  componentsUserMenu: Componentes [] = [
    {
      icon: 'attach',
      name: 'Mis Reservas',
      redirectTo: '/reservas'
    },
    {
      icon: 'trophy',
      name: 'Mis Torneos',
      redirectTo: '/torneos'
    },
    {
      icon: 'people',
      name: 'Socios Club',
      redirectTo: '/socios'
    },
    {
      icon: 'notifications',
      name: 'Novedades',
      redirectTo: '/settings'
    },
    {
      icon: 'settings',
      name: 'Configuracion',
      redirectTo: '/settings'
    }
    

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private userSvc: UserService,
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public alertCtrl: AlertController

  ) {
    this.initializeApp();

    


  }

  ngOnInit() {

   this.afAuth.user.subscribe( res => {
      this.user = res.email
      this.uid = res.uid
      
     console.log(this.uid)
    })
    
    this.mainuser = this.afstore.doc(`users/${this.userSvc.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event =>{
      this.username = event.username
      this.picture = event.picture
      
      console.log(this.picture)
    })
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentAlert(title: string, content: string){
    const alert = await this.alertCtrl.create({
      header: title,
      message: content,
      buttons: ['Vale']
    })
    await alert.present()
  }

  async register(){
    const { username, email, passwd, socio, picture } = this
    
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, passwd)
    
      this.afstore.doc(`users/${res.user.uid}`).set({
          email,
          username,
          picture,
          socio
      })

      this.userSvc.setUser({
        email,
        uid: res.user.uid
      })


      this.presentAlert('Perfecto', 'Estas registrado')
      document.getElementById('regForm').style.display = "none"
      document.getElementById('logForm').style.display = "block"
     
      


    } catch(err){
      console.dir(err)
    }

  }


  async login(){

    const { email, passwd } = this

    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, passwd)
    
      if(res.user) {
        this.userSvc.setUser({
          email,
          uid: res.user.uid
        })

        this.presentAlert('Perfecto', 'Estas logeado')
        
        console.log(this.user)
      }
    
    } catch (err){
      console.dir(err)
      
    }


  }


  



  closeMenu(){
    this.menuCtrl.close()
  }

  darkMode(event){
    console.log(event.target.value)
    console.log(event.target.id)
  }

  logForm(){
    let divReg = document.getElementById('regForm')
    let divLog = document.getElementById('logForm')
    divReg.style.display = "none"
    divLog.style.display = "block"
  }

  regForm(){
    let divReg = document.getElementById('regForm')
    let divLog = document.getElementById('logForm')
    divLog.style.display = "none"
    divReg.style.display = "block"
  }


  

}




interface Componentes {
  icon: string,
  name: string,
  redirectTo: string
}