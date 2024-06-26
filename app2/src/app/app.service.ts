import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  id: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private userSubject = new BehaviorSubject<User>({
    name: '',
    id: 0,
    token: ''
  });

  user$: Observable<User> = this.userSubject.asObservable();

  constructor() {}

  setUser(user: User) {
    this.userSubject.next(user);
  }
}