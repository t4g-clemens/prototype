import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
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

  getList(): AngularFireList<JobDescription> {
    return this.items
  }

  addItem(item: JobDescription) {
    this.items.push(item).then(() => {console.log('added', item)})
  }
}
