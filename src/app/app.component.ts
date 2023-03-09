import { Component, OnInit, EventEmitter } from '@angular/core';
import { EmitterService } from './shared/services/emitters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  optionMenu!: string
  clickShowTogle: boolean = false

  constructor(private showNavService: EmitterService) { }

  ngOnInit(): void {
    this.checkMenu('home')
  }

  checkMenu(option: string): void {
    this.optionMenu = option
  }

  /**Cada vez que hace click en el botón para mostrar u ocultar el sub-menu */
  showTogle() {
    //Cambiamos el valor de la variable para enviarla
    this.clickShowTogle = !this.clickShowTogle

    //emitimos el cambio del evento
    this.showNavService.eventClick.emit(this.clickShowTogle)
  }

}
