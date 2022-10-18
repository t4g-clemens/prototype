import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { JobDescription as JobDescription } from '../interfaces/jobdescription';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JdDataService {

  userId?: string;
  items!: AngularFireList<JobDescription>;

  constructor(private db: AngularFireDatabase, private auth: AuthenticationService) {
    this.items = this.db.list('items');
  }

  getList(): AngularFireList<any> {
    return this.items
  }

  getItem(key: string): Observable<any>{
    return this.db.object(`items/${key}`)
    .snapshotChanges()
    .pipe(map(res => res.payload.val()))
  }


  addItem(item: JobDescription) {
    let newRef = this.items.push(item);
    return newRef.key;
  }

  deleteItem(key: string) {
    return this.db.object(`items/${key}`).remove()
  }
}
