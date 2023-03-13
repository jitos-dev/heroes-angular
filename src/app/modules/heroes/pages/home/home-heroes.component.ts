import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { EmitterService } from '../../../../shared/services/emitters.service';
import { DataApiService } from 'src/app/core/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-heroes.component.html',
  styleUrls: ['./home-heroes.component.css']
})
export class HomeHeroesComponent implements OnInit {

  optionSubMenu!: string

  //esto lo obtenemos del html. La etiqueta que queremos obtener la marcamos con #drawer
  @ViewChild('drawer') drawer!: MatDrawer

  constructor(
    private dataApi: DataApiService,
    private emitterService: EmitterService) { }

  ngOnInit(): void {
    this.checkSubMenu('home')

    //Aqui nos subscribimos al evento click del dervicio y mostramos u ocultamos el MatDrawer
    this.emitterService.eventClick.subscribe(event => {
      event == true ? this.drawer.open() : this.drawer.close()
    })

    //El evento cuando guardamos un Heroe en alta.component para redirigir a la lista de heroes
    this.redirecToAll()
  }

  getAllHeroes() {
    this.dataApi.getAllHeroes$()
      .subscribe(response => {
        //esto es un array de heroes
        console.log(response);
      })
  }

  checkSubMenu(option: string) {
    this.optionSubMenu = option
  }

  //llamo al método de este servicio que se encarga de redirigirnos a otras páginas
  redirecToAll() {
    this.emitterService.navigateEmitter.subscribe(() => {
      this.checkSubMenu('todos')
    })
  }
}
