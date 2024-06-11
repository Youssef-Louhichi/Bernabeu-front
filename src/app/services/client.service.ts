import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'https://bernabeu-render.onrender.com';

  constructor(private http: HttpClient) { }



  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/getclients`);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/getclients/${id}`);
  }

  addClient(client: Client): Observable<any> {
    return this.http.post<Client>(`${this.baseUrl}/addclient`, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/updateclient/${id}`, client);
  }

  changePassword(id: number, password: string): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/updatepwd/${id}`, password);
  }

  deleteClient(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deleteclient/${id}`);
  }

 

  login(m:string,p:string):Observable<any>{
    return this.http.get<Client>(this.baseUrl+`/getclient?login=${m}&pwd=${p}`)
  }

  logout(){
    localStorage.removeItem("idCl")
    localStorage.removeItem("state")

  }
}
