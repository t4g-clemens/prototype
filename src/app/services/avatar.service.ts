import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() {
    sessionStorage.setItem('imageUrl', this.createRandomImage())
  }

  createRandomImage() {
    let i = Math.floor(Math.random() * 9) + 1;
    return `assets/persons/${i}.svg`
  }

  getImage(): string {
    let baseUrl = 'assets/persons/1.svg'
    let randomUrl = sessionStorage.getItem('imageUrl')
    if (randomUrl !== null) {
      return randomUrl
    }
    else {
      return baseUrl
    }
  }
}
