import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'https://bernabeu-render.onrender.com';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/getreservations`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/getreservation/${id}`);
  }

  getReservationsByTerrain(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/getreservationterrain/${id}`);
  }

  getReservationsByTerrainAndDates(id: number, d1: Date, d2: Date): Observable<Reservation[]> {
    const date1 = this.formatDateToISO(d1);
    const date2 = this.formatDateToISO(d2);
    return this.http.get<Reservation[]>(`${this.baseUrl}/getreservationterrainetdate?id=${id}&date1=${date1}&date2=${date2}`);
  }
  
  private formatDateToISO(date: Date): string {
    return date.toISOString().split('T')[0]; 
  }

  getReservationsByClient(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/getreservationclient/${id}`);
  }

  getNumberOfReservationsByDate(date: Date): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/nombrereservation`, date);
  }

  addReservation(reservation: Reservation): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addreservation`, reservation);
  }

  addFeedback(id: number, feedback: string): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/addfeedback/${id}`, feedback);
  }

  addRate(id: number, rate: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/addrate/${id}`, rate);
  }

  deleteReservation(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deletereservation/${id}`);
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/updatereservation/${id}`, reservation);
  }

  markReservationDone(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/reservationdone/${id}`,Reservation);
  }

  markReservationUndone(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/reservationundone/${id}`,Reservation);
  }

  annuleReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/annuleeres/${id}`,Reservation);
  }
}
