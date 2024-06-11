import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private baseUrl = 'https://bernabeu-render.onrender.com';

  constructor(private http: HttpClient) { }

  getTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.baseUrl}/getterrains`);
  }

  getTerrainById(id: number): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.baseUrl}/getterrain/${id}`);
  }

  addTerrain(terrain: Terrain): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/addterrain`, terrain);
  }

  updateTerrain(id: number, terrain: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.baseUrl}/updateterrain/${id}`, terrain);
  }

  deleteTerrain(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deleteterrain/${id}`);
  }

  markTerrainAvailable(id: number): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.baseUrl}/terraindispo/${id}`,Terrain);
  }

  markTerrainUnavailable(id: number): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.baseUrl}/terrainindispo/${id}`,Terrain);
  }
}
