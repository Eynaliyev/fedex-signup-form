import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `https://demo-api.now.sh/users`;
  constructor(private http: HttpClient) {}

  submitUser(userData: User): Observable<User> {
    return this.http
      .post(this.baseUrl, userData)
      .pipe(map((response) => this.toUser(response)));
  }

  toUser(item: any): User {
    const result = {
      id: item._id,
      firstName: item.firstName,
      email: item.email,
      lastName: item.firstName,
    };
    return result;
  }
}
