import { Injectable } from '@angular/core';

export enum userRole {
  human_resources = 'human_resources',
  departments = 'department'
}

@Injectable({
  providedIn: 'root'
})
export class UserroleService {

  public role: userRole = userRole.human_resources;

  constructor() { }

  getUserRole(): userRole {
    return this.role
  }
}
