import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { UserService } from './user.service';


@Injectable()
export class AuthService implements CanActivate {

    userAcc: string

	constructor(private router: Router, private user: UserService) {

	}

	async canActivate(route) {
		if(await this.user.isAuthenticated()) {
            return true
            this.userAcc = this.user.getUsername()
		}
        this.userAcc = ""
		return false
	}
}