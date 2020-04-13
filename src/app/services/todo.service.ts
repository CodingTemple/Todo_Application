import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Todo } from '../todo/todo.interface';

// Import for SwitchMap -- which will allow two (or more) sets of 
// functions and operations to occur one after the other

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  getTodos(){
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.db.collection<Todo>('todos', ref => ref.where('uid','==', user.uid))
                  .valueChanges({
                    idField: 'id'
                  })
        }
      })
    )
  }
}
