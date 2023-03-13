import { EventEmitter, Injectable } from '@angular/core';
import { HeroeModel } from 'src/app/core/models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  eventClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  eventClickDeleteHeroe: EventEmitter<boolean> = new EventEmitter<boolean>();
  dataSourceEmitter: EventEmitter<Array<HeroeModel>> = new EventEmitter();
  navigateEmitter: EventEmitter<void> = new EventEmitter<void>();
  loginEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
