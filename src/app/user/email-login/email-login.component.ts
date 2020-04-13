import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  type: 'login' | 'signup' |'reset' = 'signup';
  serverMessage: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      passwordConfirm: ['',[]]
    })
  }


  // Check what the user is trying to do based on the type defined above
  changeType(val){
    this.type = val;
  }

  // Getter Methods for our form which change HTML based on type
  get isLogin(){
    return this.type === 'login';
  }

  get isSignup(){
    return this.type === 'signup';
  }

  get isPasswordReset(){
    return this.type === 'reset';
  }

  // Getters for info from form when submitted
  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }

  get passwordConfirm(){
    return this.form.get('passwordConfirm')
  }
// passwordDoesMatch checks the password field and the passwordConfirm field
// To find equal values if there are any
  get passwordDoesMatch(){
    if(this.type !== 'signup'){
      return true
    } else {
      return this.password.value === this.passwordConfirm.value
    }
  }

  

  async onSubmit(){
    /**
   * OnSubmit will communicat with firebase auth via our form created by Angular
   * And find out if the user is logging in, signing up, or resetting password.
   * Depending on what they have selected to do, the onSubmit function will send
   * the respective data to firebase auth.
   * 
   * This function is also a async function which means, we will wait for the response
   * from firebase to come back and resolve before we move on to other operations.
   * 
   * So, the async keyword is placed on the beginning of the method and each firebase
   * API call is given an await keyword to resolve the execution before we move through
   * the event block via JavaScript.
   */
    this.loading = true;
    const email = this.email.value // This is the form data coming from the above form
    const password = this.password.value // Same as above

    try{
      if(this.isLogin){
        await this.afAuth.signInWithEmailAndPassword(email,password) // Returns a Promise
      } else if (this.isSignup){
        await this.afAuth.createUserWithEmailAndPassword(email,password)
      } else if(this.isPasswordReset){
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check Your Email'
      }
    }
    catch(err){
      this.serverMessage = err
    }
    this.loading = false;
    }
  }




