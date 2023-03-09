import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ShowNavService } from '../../../../shared/services/show-nav.service';
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
    private showNavService: ShowNavService) { }

  ngOnInit(): void {
    this.checkSubMenu('home')

    //Aqui nos subscribimos al evento click del dervicio y mostramos u ocultamos el MatDrawer
    this.showNavService.eventClick.subscribe(event => {
      event == true ? this.drawer.open() : this.drawer.close()
    })
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
}
