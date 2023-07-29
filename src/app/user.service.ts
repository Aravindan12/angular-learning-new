import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  create(user: User): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:8000/api/users/store', user, this.httpOptions);
  }
  getUsers(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/users');
  }
  getUser(id:any): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/users/edit/'+id);
  }
  update(user: User): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:8000/api/users/update', user, this.httpOptions);
  }
  delete(id:any): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/users/delete/'+id);
  }
  constructor(private http: HttpClient) { }
}
