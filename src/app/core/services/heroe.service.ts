import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  urlData: string = environment.urlData
  arrHeroes: Array<HeroeModel> = []

  constructor(private httpClient: HttpClient) { }

  getAllHeroes$(): Observable<Array<HeroeModel>> {

    return this.httpClient.get(`${this.urlData}heroes`)
      .pipe(
        map((obj: any) => {
          return obj
        })
      )
  }

}

