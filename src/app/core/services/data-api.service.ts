import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  urlData: string = environment.urlData
  arrHeroes: Array<HeroeModel> = []

  constructor(private http: HttpClient) { }

  getAllHeroes$(): Observable<Array<HeroeModel>> {
    return this.http.get(`${this.urlData}heroes`)
      .pipe(
        map((obj: any) => {
          return obj
        })
      )
  }

  // getHeroesById(id: string | null): Observable<Heroe[]> {
  getHeroesById(id: string): Observable<HeroeModel> {
    return this.http.get<HeroeModel>(`${this.urlData}heroes/${id}`);
  }

  getHeroesByQuery(query: string): Observable<HeroeModel[]> {
    return this.http.get<HeroeModel[]>(`${this.urlData}heroes?q=${query}`);
  }

  addHeroe(heroe: HeroeModel): Observable<HeroeModel> {
    return this.http.post<HeroeModel>(`${this.urlData}heroes`, heroe);
  }

  editHeroe(heroe: HeroeModel): Observable<HeroeModel> {
    return this.http.put<HeroeModel>(`${this.urlData}heroes/${heroe.id}`, heroe);
  }

  deleteHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlData}heroes/${id}`);
  }

  getAllUsers$(): Observable<Array<any>> {
    return this.http.get(`${this.urlData}usuarios`)
      .pipe(
        map((obj: any) => {
          return obj
        })
      )
  }

  addUser$(user: any): Observable<any> {
    return this.http.post<HeroeModel>(`${this.urlData}usuarios`, user);
  }

}

