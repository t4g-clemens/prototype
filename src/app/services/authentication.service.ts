import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
    }

  logout () {
    console.log("loggin out")
    return from(this.auth.signOut())
  }

  getUser() {
    return this.auth.user
  }
}
