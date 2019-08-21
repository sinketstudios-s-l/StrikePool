import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'

interface user{
  username: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: user

  constructor(private afAuth: AngularFireAuth) { }

    setUser(userN: user){
        this.user = userN
    }

    getUsername(): string {
      return this.user.username
    }

    getUID(): string {
      return this.user.uid
    }

    async isAuthenticated(){
      if(this.user) return true

      const user = await this.afAuth.authState.pipe(first()).toPromise()

      if(user){
        this.setUser({
          username: user.email,
          uid: user.uid
        })
        return true
      }
      return false
    }






  
}
