import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  eventClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  eventClickDeleteHeroe: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
