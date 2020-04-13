import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';
import { Todo } from '../todo/todo.interface';

// Dialog Modal Import(s)
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 

// Import angular forms
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  userId: string;
  todos: Todo[];

  constructor(private afs:AngularFirestore, private auth: AuthService, public todoService: TodoService, public dialog: MatDialog) { }

  // async saveUserInfo(){
  //   await this.auth.getUserInfo().subscribe(userInfo => {
  //     console.log(userInfo.uid);
  //     this.userId = userInfo.uid
  //   })
  // }

  // Todo Form using the Reactive Forms Module given to us from Angular
  // This will grab info from the Form and allow us to save that info
  // Into two parameters after the form is submitted. 
  // This example of a form is specifically modeled after the documentation
  // Found Here: https://angular.io/guide/reactive-forms
  todoForm = new FormGroup({
    todoName :new FormControl('', [Validators.required]),
    todoDescription: new FormControl('',[Validators.required])
  })

  testGetId(){
    // This function gets and stores the userId given to us from the angularFire 
    // Module. This communicates with firebase on the user's data and returns
    // the Uid for the current user.
    // Angular Fire Documentation can be found here: https://github.com/angular/angularfire
    this.auth.getUserInfo().subscribe(user => {
      console.log(user.uid)
      this.userId = user.uid;
      console.log(this.userId)
    })
  }


  onSubmit(){

    console.log(this.todoForm.value, this.userId)

    /*
      todoFormValue:{
        todoName: 'Take out trash',
        todoDescription: 'Take trash to the dumpster and add new bag later'
      }
    */

    // Add info to the database using Firebase.
    // This will also be done using the Firebase Firestore Module
    // AKA AngularFirestoreModule
    //This will grab validated info from the form and send the info to Firebase
    // From the ngSubmit event emitter. (ngSubmit) = 'onSubmit()'
    this.afs.collection('todos').add({
     uid:this.userId,
     todoName: this.todoForm.value.todoName,
     todoDescription: this.todoForm.value.todoDescription
    })
  }

  showTodos(){
    this.todoService.getTodos().subscribe(todos => {
      console.log(todos)
      this.todos = todos; // this will declare todos from the data brought back from firebase
    })
  }

  // Method to display a pop up when UpdateTodo is clicked
  openDialog(todoIndex: string, documentId:string){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '250px',
      data: {indexData: todoIndex, fbdocumentId: documentId}
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog has been closed')
    })
  }

  deleteInfo(documentId:string){
    this.afs.collection('todos').doc(documentId).delete();
  }


  ngOnInit(): void {
    this.testGetId()
  }

}
