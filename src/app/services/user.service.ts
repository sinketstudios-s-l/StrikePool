import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'


interface user{
  email: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: user


  constructor(private afAuth: AngularFireAuth) { 

   
  }

    setUser(user: user){
        this.user = user
    }

    getUsername(): string {
      return this.user.email
    }

    getUID(): string {
      return this.user.uid
    }

    reAuth(email: string, passwd: string) {
      return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, passwd))
    }

    async isAuthenticated(){
      if(this.user) return true

      const user = await this.afAuth.authState.pipe(first()).toPromise()

      if(user){
        this.setUser({
          email: user.email,
          uid: user.uid
        })
        return true
        
      }
      return false
    }






  
}
