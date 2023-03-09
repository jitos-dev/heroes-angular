import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowNavService {

  eventClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
