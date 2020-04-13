import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Import For AngularFireAuth -- communication between our
// Application and the Firebase Console
import { AngularFireAuth } from '@angular/fire/auth';

// Import for SnackService -- Display small modal to the user
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private afAuth: AngularFireAuth, private snack: SnackService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if(!isLoggedIn){
      this.snack.authError();
    }
    return isLoggedIn;
  }
  
}
