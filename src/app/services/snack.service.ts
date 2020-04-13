import { Injectable } from '@angular/core';
//Import for SnackBar
import { MatSnackBar } from '@angular/material/snack-bar';

//Import Angular Router
import { Router } from '@angular/router';

// Import the tap operator from rxJS - which helps route users based on a "tap" aka button click
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  // AuthError Method will produce the snack bar when a guarded route is accessed
  // from an unauthenticated user request
  // Snackbar Open method params (capation:string, action?(optional), config?(optional))

  authError(){
    this.snackBar.open("You must be logged In!!!", "Login Please", {
      duration: 5000
    })

    return this.snackBar._openedSnackBarRef
                        .onAction()
                        .pipe(
                          tap(_ => this.router.navigate(['/login']) )
                        ).subscribe()
  }
}
