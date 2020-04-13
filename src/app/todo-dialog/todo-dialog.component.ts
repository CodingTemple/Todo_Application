import { Component, OnInit, Inject } from '@angular/core';
import  { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../todo/todo.interface';

// Import for dialog form
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { database } from 'firebase';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<TodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private db: AngularFirestore
              ) { }
  
  todoFormDialog = new FormGroup({
    todoName :new FormControl('', [Validators.required]),
    todoDescription: new FormControl('',[Validators.required])
  })

  sendUpdate(){
    console.log(this.data.indexData)
    console.log(this.data.fbdocumentId)
    this.db.collection('todos').doc(this.data.fbdocumentId)
                               .update({
                                 todoName: this.todoFormDialog.value.todoName,
                                 todoDescription: this.todoFormDialog.value.todoDescription
                               })
  }







  onNoClick(){
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
